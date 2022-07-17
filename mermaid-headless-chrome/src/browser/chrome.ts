import { chromium } from "playwright-chromium";
import chrome from "chrome-aws-lambda";

export async function initChrome() {
  const chromeBinary = await chrome.executablePath;
  if (chromeBinary) {
    // AWS Lambda specific
    return chromium.launch({
      args: chrome.args,
      executablePath: chromeBinary,
      headless: chrome.headless,
    });
  }

  return chromium.launch();
}
