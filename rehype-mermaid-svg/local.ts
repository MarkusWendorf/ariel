import { mkdirSync, readFileSync, writeFileSync } from "fs";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeMermaidSvg } from ".";

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeMermaidSvg, "d3gxhhtylnztw7.cloudfront.net")
    .use(rehypeStringify)
    .process(readFileSync("./examples/diagram.md", "utf-8"));

  mkdirSync("./dist");
  writeFileSync("./dist/diagram.html", file.value, {flag: ""});
}

// console.log(t());
main();