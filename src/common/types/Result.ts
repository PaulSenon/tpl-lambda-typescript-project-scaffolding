// Todo: move out
export type TypedError<T extends string, E extends Error = Error> = {
  type: T;
  error: E;
};

export type Failure<EType extends string, E extends Error = Error> = {
  success: false;
  data: void;
  typedError: TypedError<EType, E>;
};

export type Success<T> = {
  success: true;
  data: T;
};

export type Result<T, EType extends string | void> = EType extends string
  ? Success<T> | Failure<EType>
  : Success<T>;
