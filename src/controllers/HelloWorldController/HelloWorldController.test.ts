import { IGetRandomNameUseCase } from '@/domain/useCases/GetRandomNameUseCase/GetRandomNameUseCase';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import HelloWorldController from './HelloWorldController';

function createGetRandomNameUseCaseMock(): IGetRandomNameUseCase {
  return {
    execute: jest.fn(),
  };
}

describe('HelloWorldController', () => {
  it('should return 200 and the name when getRandomNameUseCase is successful', async () => {
    const name = 'Toto';
    const getRandomNameUseCase = createGetRandomNameUseCaseMock();
    getRandomNameUseCase.execute = jest.fn().mockResolvedValue({ success: true, data: { name } });
    const controller = new HelloWorldController(getRandomNameUseCase);

    const result = await controller.handle({} as APIGatewayProxyEvent, {} as Context);

    expect(result).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: `Hello ${name}`,
    });
  });

  it('should return 500 and the error message when getRandomNameUseCase fails', async () => {
    const error = { type: 'ErrorType', error: new Error('Error message') };
    const getRandomNameUseCase = createGetRandomNameUseCaseMock();
    getRandomNameUseCase.execute = jest
      .fn()
      .mockResolvedValue({ success: false, typedError: error });
    const controller = new HelloWorldController(getRandomNameUseCase);
    const spyErrorLog = jest.spyOn(console, 'error').mockImplementation(jest.fn()).mockReset();

    const result = await controller.handle({} as APIGatewayProxyEvent, {} as Context);

    expect(result).toEqual({
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `[${error.type}] ${error.error.message}`,
    });
    expect(spyErrorLog).toHaveBeenCalledTimes(1);
    expect(spyErrorLog).toHaveBeenCalledWith(error);
  });

  it('should return 500 and "UNHANDLED ERROR" when an exception is thrown', async () => {
    const error = new Error('Unexpected error');
    const getRandomNameUseCase = createGetRandomNameUseCaseMock();
    getRandomNameUseCase.execute = jest.fn().mockRejectedValue(error);
    const controller = new HelloWorldController(getRandomNameUseCase);
    const spyErrorLog = jest.spyOn(console, 'error').mockImplementation(jest.fn()).mockReset();

    const result = await controller.handle({} as APIGatewayProxyEvent, {} as Context);

    expect(result).toEqual({
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'UNHANDLED ERROR',
    });
    expect(spyErrorLog).toHaveBeenCalledTimes(1);
    expect(spyErrorLog).toHaveBeenCalledWith(error);
  });
});
