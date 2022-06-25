import { Browser } from "playwright-chromium";
import html from "../templates/mermaid.html";

export async function generateSvgDiagram(browser: Browser, diagram: string) {
  const page = await browser.newPage();
  await page.setContent(html);

  const diagramSvg = await page.evaluate((diagramSource) => {
    // This function executes within chromium
    return new Promise((resolve, reject) => {
      const win = window as any;

      const timeout = setTimeout(() => reject("Diagram rendering timed out after 10s"), 10000);
      const renderDiagram = win.mermaid.render("diagram", diagramSource, resolve);

      return Promise.race([renderDiagram, timeout]);
    });
  }, diagram);

  return diagramSvg as string;
}
