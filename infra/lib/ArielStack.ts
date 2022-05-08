import { Duration, Lazy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Code, Function, FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as path from "path";
import { CachePolicy, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";

export class ArielStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const func = new Function(this, "MermaidLambda", {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 2048,
      code: Code.fromAsset(path.join(process.cwd(), "..", "dist", "dist.zip")),
      handler: "handler.handler",
    });

    const endpoint = func.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        maxAge: Duration.days(1),
      },
    });

    const apiDomain = Lazy.uncachedString({
      produce: (context) => {
        const resolved = context.resolve(endpoint.url);
        return { "Fn::Select": [2, { "Fn::Split": ["/", resolved] }] } as any;
      },
    });

    const distribution = new cloudfront.Distribution(this, "Cloudfront", {
      defaultBehavior: {
        origin: new HttpOrigin(apiDomain),
        cachePolicy: new CachePolicy(this, "CacheForeverPolicy", {
          minTtl: Duration.days(365),
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}
