import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class AwsCdkLambdaCallTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const randomHelloLambdaFunctionName = `helloLambdaFunction${Math.floor(
      Math.random() * 100000
    )}`;

    const helloLambda = new lambda.Function(this, "HelloLambda", {
      functionName: randomHelloLambdaFunctionName,
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 512,
      tracing: lambda.Tracing.ACTIVE,
      code: lambda.Code.fromAsset("lambdas/hello"),
      handler: "index.handler",
    });

    const callerLambda = new lambda.Function(this, "CallerLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 512,
      tracing: lambda.Tracing.ACTIVE,
      code: lambda.Code.fromAsset("lambdas/caller"),
      handler: "index.handler",
      environment: {
        HELLO_LAMBDA_NAME: randomHelloLambdaFunctionName,
      },
    });

    helloLambda.grantInvoke(callerLambda);
  }
}
