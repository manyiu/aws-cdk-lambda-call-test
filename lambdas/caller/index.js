const { InvokeCommand, LambdaClient } = require("@aws-sdk/client-lambda");

exports.handler = async function (event) {
  const client = new LambdaClient();

  const command = new InvokeCommand({
    FunctionName: process.env.HELLO_LAMBDA_NAME,
  });

  await client.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Called\n`,
  };
};
