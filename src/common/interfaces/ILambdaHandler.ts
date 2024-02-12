import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

export default interface ILambdaHander<T extends APIGatewayProxyResult = APIGatewayProxyResult> {
  handle(event: APIGatewayProxyEvent, context: Context): Promise<T>;
}
