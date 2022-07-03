import { Duration, Lazy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  Code,
  Function,
  FunctionUrlAuthType,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { CachePolicy, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import * as path from "path";

export class ArielStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const func = new Function(this, "MermaidLambda", {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 2048,
      code: Code.fromAsset(
        path.join(
          process.cwd(),
          "..",
          "mermaid-headless-chrome",
          "dist",
          "dist.zip"
        )
      ),
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

    const certificate = Certificate.fromCertificateArn(
      this,
      "Certificate",
      "arn:aws:acm:us-east-1:420912396104:certificate/8b452da9-bd92-471b-802f-85cf34b98d6b"
    );

    new Distribution(this, "Cloudfront", {
      domainNames: ["mermaid.irrlicht.io"],
      certificate,
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
