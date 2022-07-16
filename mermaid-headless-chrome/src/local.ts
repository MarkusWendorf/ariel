import { initChrome } from "./browser/chrome";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { generateSvgDiagram } from "./render";
import { base64ToString, stringToBase64 } from "./util/base64";

process.on("SIGINT", () => process.exit(0));

run(
  stringToBase64(`stateDiagram-v2
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]`),
);

async function run(diagramBase64: string) {
  console.log(diagramBase64);

  const chrome = await initChrome();

  const diagram = base64ToString(diagramBase64);
  const svg = await generateSvgDiagram(chrome, diagram);

  if (!existsSync("./dist")) {
    mkdirSync("./dist");
  }

  writeFileSync("./dist/test.svg", svg);

  await chrome.close();
}
