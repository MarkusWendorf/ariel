import { initChrome } from "./browser/chrome";
import { writeFileSync } from "fs";
import { generateSvgDiagram } from "./render";
import { base64ToString, stringToBase64 } from "./util/base64";

process.on("SIGINT", () => process.exit(0));

run(
  stringToBase64(`
    sequenceDiagram
    participant Äliße
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
`),
);

async function run(diagramBase64: string) {
  console.log(diagramBase64);

  const chrome = await initChrome();

  const diagram = base64ToString(diagramBase64);
  const svg = await generateSvgDiagram(chrome, diagram);
  writeFileSync("./dist/test.svg", svg);

  await chrome.close();
}
