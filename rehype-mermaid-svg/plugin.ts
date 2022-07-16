import { type Transformer } from "unified";
import { visit } from "unist-util-visit";
import { parseFragment } from "parse5";
import { fromParse5 } from "hast-util-from-parse5";
import { is } from "unist-util-is";
import { isElement } from "hast-util-is-element";
import { type Element, matches } from "hast-util-select";
import fetch from "node-fetch";
import type { Text } from "hast";

export interface Options {
  renderDiagram: (diagram: string) => Promise<string>;
}

export function rehypeMermaidSvg(options: Options): Transformer {
  return async (tree) => {
    const nodesToModify: Array<{ node: Element; diagram: string }> = [];

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
      if (is<Text>(diagramText, "text") && diagramText.value) {
        nodesToModify.push({
          node: parent,
          diagram: diagramText.value,
        });
      }
    });

    for (const currentNode of nodesToModify) {
      const diagram = await options.renderDiagram(currentNode.diagram);
      const node = currentNode.node;

      node.children[0] = svgToHtmlAst(diagram);
      node.tagName = "div";
      node.properties = {
        className: "diagram",
      };
    }
  };
}

function svgToHtmlAst(svg: string) {
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
