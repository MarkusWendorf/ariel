import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { generateSvgDiagram } from "./render";
import { base64ToString } from "./util/base64";
import errorHtml from "./templates/error.html";
import { initChrome } from "./browser/chrome";

const browser = initChrome();

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  // remove leading slash to access base64 encoded diagram
  const diagram = base64ToString(event.rawPath.slice(1));

  try {
    const chromiumInstance = await browser;
    const svg = await generateSvgDiagram(chromiumInstance, diagram);

    return {
      body: svg,
      headers: {
        "Content-Type": "image/svg+xml",
      },
      statusCode: 200,
    };
  } catch (err) {
    return handleError(err, diagram);
  }
};

function handleError(err: unknown, diagram: string) {
  if (err instanceof Error) {
    return {
      body: errorHtml(err.stack || err.message, diagram),
      headers: {
        "Content-Type": "text/html"
      },
      statusCode: 500,
    }
  }
  
  return {
    body: "Internal server error",
    statusCode: 500,
  }
}