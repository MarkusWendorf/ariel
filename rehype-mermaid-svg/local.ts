import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeMermaidSvg } from "./plugin.js";

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeMermaidSvg, { renderDiagram })
    .use(rehypeStringify)
    .process(readFileSync("./examples/diagram.md", "utf-8"));

  if (!existsSync("./dist")) {
    mkdirSync("./dist");
  }

  writeFileSync("./dist/diagram.html", file.value, { flag: "" });
}

async function renderDiagram(diagram: string) {
  const domain = "mermaid.irrlicht.io";
  const svgBase64 = btoa(diagram);

  return fetch(`https://${domain}/${svgBase64}`).then((response) =>
    response.text()
  );
}

// console.log(t());
main();
