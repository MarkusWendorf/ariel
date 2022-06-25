var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeMermaidSvg } from "./plugin";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeMermaidSvg, "d3gxhhtylnztw7.cloudfront.net")
            .use(rehypeStringify)
            .process(readFileSync("./examples/diagram.md", "utf-8"));
        if (!existsSync("./dist")) {
            mkdirSync("./dist");
        }
        writeFileSync("./dist/diagram.html", file.value, { flag: "" });
    });
}
// console.log(t());
main();
