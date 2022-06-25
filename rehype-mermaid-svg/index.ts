import { Transformer } from "unified";
import { visit } from "unist-util-visit";
import { parseFragment } from "parse5";
import { fromParse5 } from "hast-util-from-parse5";
import { is } from "unist-util-is";
import { isElement } from "hast-util-is-element";
import { Element, matches } from "hast-util-select";
import fetch from "node-fetch";
import { Text } from "hast";

export function rehypeMermaidSvg(mermaidRendererDomain: string): Transformer {
  return async (tree) => {
    const nodesToModify: Array<{ node: Element; svgBase64: string }> = [];

    visit(tree, (node, index, parent) => {
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
      if (!is<Text>(diagramText, "text")) {
        return;
      }

      nodesToModify.push({
        node: parent,
        svgBase64: btoa(diagramText.value),
      });
    });

    await Promise.all(
      nodesToModify.map(({ node, svgBase64 }) =>
        renderDiagramToNode(mermaidRendererDomain, node, svgBase64)
      )
    );
  };
}

async function renderDiagramToNode(
  mermaidRendererDomain: string,
  parent: Element,
  svgBase64: string
) {
  const svg = await fetch(`https://${mermaidRendererDomain}/${svgBase64}`).then(
    (response) => response.text()
  );

  parent.children[0] = svgToHtmlAst(svg);
  parent.tagName = "div";
  parent.properties = {
    className: "diagram",
  };
}

function svgToHtmlAst(svg: string) {
  const parsedSvg = parseFragment(svg, {
    scriptingEnabled: false,
    sourceCodeLocationInfo: true,
    onParseError: (err) => console.log(err),
  });

  const hastTree = fromParse5(parsedSvg.childNodes[0], { space: "svg" });
  if (!isElement(hastTree)) {
    throw new Error("Invalid hast tree returned while parsing svg");
  }

  return hastTree;
}
