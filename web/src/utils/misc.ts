// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !window.invokeNative;

export const noop = () => {};

export const formatDate = (date: number | Date): string => {
  date = new Date(date);

  return date.toLocaleString();
}

export const formatTimeDifference = (
  targetTimestamp: number,
  currentTimestamp: number = Date.now()
): string => {
  const difference = Math.abs(currentTimestamp - targetTimestamp);

  const suffix = targetTimestamp - currentTimestamp > 0 ? 'to go' : 'ago';

  const formatUnit = (value: number, unit: string): string => {
    const formattedValue = Math.floor(value);
    const plural = formattedValue !== 1 ? 's' : '';
    return `${formattedValue} ${unit}${plural} ${suffix}`;
  };

  if (difference >= 604_800_000) {
    const weeks = difference / 604_800_000;
    if (weeks >= 4) {
        return formatUnit(weeks, 'week');
    }
    return formatUnit(weeks, 'week');
  }

  if (difference >= 86_400_000) {
    const days = difference / 86_400_000;
    return formatUnit(days, 'day');
  }

  if (difference >= 3_600_000) {
    const hours = difference / 3_600_000;
    return formatUnit(hours, 'hour');
  }

  if (difference >= 60_000) {
    const minutes = difference / 60_000;
    return formatUnit(minutes, 'minute');
  }

  return 'just now';
}
