import { Failure, Success, TypedError } from '../../types/Result';

function Ok(): Success<void>;
function Ok<const T>(data: T): Success<T>;
function Ok<const T>(data?: T): Success<T | undefined> {
  return {
    success: true,
    data,
  };
}

function Err<const EType extends string>(typedError: TypedError<EType, Error>): Failure<EType>;
function Err<const EType extends string>(type: EType, error: Error): Failure<EType>;
function Err<const EType extends string>(
  typeOrTypedError: EType | TypedError<EType, Error>,
  error: Error | undefined,
): Failure<EType, Error>;
function Err<const EType extends string>(
  typeOrTypedError: EType | TypedError<EType, Error>,
  error: Error | undefined = undefined,
): Failure<EType, Error> {
  if (typeof typeOrTypedError === 'string' && error !== undefined) {
    const type = typeOrTypedError;
    return {
      success: false,
      data: undefined,
      typedError: { type, error },
    };
  } else if (typeof typeOrTypedError === 'object') {
    const typedError = typeOrTypedError;
    return {
      success: false,
      data: undefined,
      typedError,
    };
  } else {
    return {
      success: false,
      data: undefined,
      typedError: {
        type: 'FatalError' as EType,
        error: new Error(
          'Err() helper function has been called with bad arguments. This should have never happened. Please fix types! ',
        ),
      },
    };
  }
}

export function createTypedOk<T>(): typeof Ok<T> {
  return (data: T) => Ok(data);
}

export function createTypedErr<T extends string>(): typeof Err<T> {
  return <const EType extends string>(
    typeOrTypedError: EType | TypedError<EType, Error>,
    error: Error | undefined = undefined,
  ) => Err(typeOrTypedError, error);
}
