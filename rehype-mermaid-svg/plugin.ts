import { type Transformer } from "unified";
import { visit } from "unist-util-visit";
import { parseFragment } from "parse5";
import { fromParse5 } from "hast-util-from-parse5";
import { is } from "unist-util-is";
import { isElement } from "hast-util-is-element";
import { type Element, matches } from "hast-util-select";
import type { Text } from "hast";

export interface Options {
  renderDiagram: (diagram: string) => Promise<string>;
}

export function rehypeMermaidSvg(options: Options): Transformer {
  return async (tree) => {
    const nodesToModify: Array<{
      node: Element;
      diagram: string;
      meta?: string;
    }> = [];

    visit(tree, (node, idx, parent: unknown) => {
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
        const meta = node?.data?.meta as string | undefined;

        nodesToModify.push({
          meta,
          node: parent,
          diagram: diagramText.value,
        });
      }
    });

    const svgList = await Promise.all(
      nodesToModify.map(async (node) => {
        const svg = await options.renderDiagram(node.diagram);
        return svgToHtmlAst(svg);
      })
    );

    for (let i = 0; i < svgList.length; i++) {
      const { node, meta } = nodesToModify[i];
      const svg = svgList[i];

      const metadata = parseMetadata(meta);

      node.children[0] = svg;
      node.tagName = "div";
      node.properties = {
        className: "diagram",
        style: styles(metadata),
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

function parseMetadata(data: string | undefined) {
  if (!data) return undefined;

  const keyValuePairs = data.split(/\s/).map((segment) => {
    const [key, value] = segment.split("=");
    if (key && value) {
      return [key, value];
    }

    return [];
  });

  return Object.fromEntries(keyValuePairs);
}

function styles(metadata?: Record<string, unknown>) {
  if (!metadata) return "";

  const keys = ["height", "width"];
  const style = keys
    .map((key) => (metadata[key] ? `${key}:${metadata[key]}` : ""))
    .join(";");

  return style;
}
