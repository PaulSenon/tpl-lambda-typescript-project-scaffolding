import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// hello.ts
export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  void context; // unused
  void event; // unused
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Hello, World!',
  };
};
