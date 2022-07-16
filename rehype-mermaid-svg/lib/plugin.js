import { visit } from "unist-util-visit";
import { parseFragment } from "parse5";
import { fromParse5 } from "hast-util-from-parse5";
import { is } from "unist-util-is";
import { isElement } from "hast-util-is-element";
import { matches } from "hast-util-select";
export function rehypeMermaidSvg(options) {
    return async (tree) => {
        const nodesToModify = [];
        visit(tree, (node, idx, parent) => {
            /* Looking for a tree like this
              <pre>
                <code class="language-mermaid">  <-- node
                  graph TD;
                    A-->B;
                    A-->C;
                </code>
              </pre>
            */
            if (!isElement(node) || !isElement(parent)) {
                return;
            }
            if (!matches(".language-mermaid", node)) {
                return;
            }
            const diagramText = node.children[0];
            if (is(diagramText, "text") && diagramText.value) {
                nodesToModify.push({
                    node: parent,
                    diagram: diagramText.value,
                });
            }
        });
        const svgList = await Promise.all(nodesToModify.map(async (node) => {
            const svg = await options.renderDiagram(node.diagram);
            return svgToHtmlAst(svg);
        }));
        for (let i = 0; i < svgList.length; i++) {
            const node = nodesToModify[i].node;
            const svg = svgList[i];
            node.children[0] = svg;
            node.tagName = "div";
            node.properties = {
                className: "diagram",
            };
        }
    };
}
function svgToHtmlAst(svg) {
    const parsedSvg = parseFragment(svg.trim(), {
        scriptingEnabled: false,
        sourceCodeLocationInfo: true,
        onParseError: (err) => console.log(err),
    });
    const hastTree = fromParse5(parsedSvg.childNodes[0], { space: "html" });
    if (!isElement(hastTree)) {
        throw new Error("Invalid hast tree returned while parsing svg");
    }
    return hastTree;
}
