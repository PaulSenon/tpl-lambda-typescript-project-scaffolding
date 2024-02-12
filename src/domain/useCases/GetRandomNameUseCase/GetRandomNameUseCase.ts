import { createTypedErr, createTypedOk } from '@/common/helpers/resultHelpers/resultHelpers';
import IUseCase from '@/common/interfaces/IUseCase';

export type Input = void;
export type Output = { name: string };
export type Error = 'RandomTestError';
export interface IGetRandomNameUseCase extends IUseCase<Input, Output, Error> {}
const Ok = createTypedOk<Output>();
const Err = createTypedErr<Error>();

const NAMES = ['world', 'toto', 'titi', 'tata'];

export default class GetRandomNameUseCase implements IGetRandomNameUseCase {
  async execute() {
    // fake error 1/2 of the time
    const somethingWentWrong = Math.random() > 0.5;
    if (somethingWentWrong) {
      return Err('RandomTestError', new Error('Something went wrong ¯\\_(ツ)_/¯'));
    }

    // success
    const randomIndex = Math.floor(Math.random() * NAMES.length);
    const randomName = NAMES[randomIndex];
    return Ok({ name: randomName });
  }
}
