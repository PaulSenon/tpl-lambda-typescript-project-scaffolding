import ILambdaHander from '@/common/interfaces/ILambdaHandler';
import { IGetRandomNameUseCase } from '@/domain/useCases/GetRandomNameUseCase/GetRandomNameUseCase';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export default class HelloWorldController implements ILambdaHander {
  constructor(private readonly getRandomName: IGetRandomNameUseCase) {}

  async handle(event: APIGatewayProxyEvent, context: Context) {
    try {
      void context; // unused
      void event; // unused

      const result = await this.getRandomName.execute();

      if (!result.success) {
        console.error(result.typedError);
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'text/plain' },
          body: `[${result.typedError.type}] ${result.typedError.error.message}`,
        };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Hello ${result.data.name}`,
      };
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: `UNHANDLED ERROR`,
      };
    }
  }
}
