import HelloWorldController from '@/controllers/HelloWorldController/HelloWorldController';
import GetRandomNameUseCase, {
  IGetRandomNameUseCase,
} from '@/domain/useCases/GetRandomNameUseCase/GetRandomNameUseCase';

const getRandomName: IGetRandomNameUseCase = new GetRandomNameUseCase();
const helloWorldController = new HelloWorldController(getRandomName);

export const handler = helloWorldController.handle.bind(helloWorldController);
