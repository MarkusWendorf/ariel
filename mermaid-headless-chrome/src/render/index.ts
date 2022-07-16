import { Browser } from "playwright-chromium";
import { createHash } from "crypto";
import html from "../templates/mermaid.html";

export async function generateSvgDiagram(browser: Browser, diagram: string) {
  const uniqueId = createHash("shake256", { outputLength: 4 }).update(diagram).digest("hex");

  const page = await browser.newPage();
  await page.setContent(html);

  const diagramSvg = await page.evaluate(
    (args) => {
      const { diagram, uniqueId } = args;

      // This function executes within chromium
      return new Promise((resolve, reject) => {
        const win = window as any;

        const timeout = setTimeout(() => reject("Diagram rendering timed out after 10s"), 10000);
        const renderDiagram = win.mermaid.render(`d${uniqueId}`, diagram, resolve);

        return Promise.race([renderDiagram, timeout]);
      });
    },
    { uniqueId, diagram },
  );

  await page.close();

  return diagramSvg as string;
}
