import getViewSizeQueryMap, { type GetViewSizeQueryMapOptions } from './getViewSizeQueryMap';

/** Returns custom media queries like object `{ ['--xxs']: '(max-width: 479px)', ... }` */
export default function exportMediaQueries(
  options?: GetViewSizeQueryMapOptions
): Record<string, string> {
  return Object.entries(getViewSizeQueryMap(options)).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {}
  );
}
