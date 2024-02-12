import { Result } from '../types/Result';

type AllowedTypes = Record<string, unknown> | void;
export default interface IUseCase<
  Input extends AllowedTypes,
  Output extends AllowedTypes,
  EType extends string | void = undefined,
> {
  execute(input: Input): Promise<Result<Output, EType>> | Result<Output, EType>;
}
