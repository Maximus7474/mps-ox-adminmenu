export type NuiFetchResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
}
