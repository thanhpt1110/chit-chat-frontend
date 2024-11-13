export type BaseResponse<T> = {
  succeed: boolean;
  result: T;
  errors: [];
};
