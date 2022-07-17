import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { generateSvgDiagram } from "./render";
import { base64ToString } from "./util/base64";
import errorHtml from "./templates/error.html";
import { initChrome } from "./browser/chrome";
import { retry } from "ts-retry-promise";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  return retry(() => generateDiagram(event), { retries: 3, backoff: "LINEAR", delay: 1000 });
};

const generateDiagram = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath;

  if (!path.startsWith("/diagram/")) {
    return { body: "Not found", statusCode: 404 };
  }

  // get base64 encoded diagram from path
  const diagram = base64ToString(path.slice("/diagram/".length));

  try {
    const chromiumInstance = await initChrome();
    const svg = await generateSvgDiagram(chromiumInstance, diagram);

    return {
      body: svg,
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    };
  } catch (err) {
    console.error(err);
    return handleError(err, diagram);
  }
};

function handleError(err: unknown, diagram: string) {
  if (err instanceof Error) {
    return {
      body: errorHtml(err.stack || err.message, diagram),
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
    };
  }

  return {
    body: "Internal server error",
    statusCode: 500,
  };
}
