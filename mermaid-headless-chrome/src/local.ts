import { initChrome } from "./browser/chrome";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { generateSvgDiagram } from "./render";
import { base64ToString, stringToBase64 } from "./util/base64";

process.on("SIGINT", () => process.exit(0));

run(
  stringToBase64(`classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
      +String beakColor
      +swim()
      +quack()
  }
  class Fish{
      -int sizeInFeet
      -canEat()
  }
  class Zebra{
      +bool is_wild
      +run()
  }`),
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
