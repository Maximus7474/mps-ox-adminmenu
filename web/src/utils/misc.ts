// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !window.invokeNative;

export const noop = () => {};

export const formatDate = (date: number | Date): string => {
  date = new Date(date);

  return date.toLocaleString();
}
