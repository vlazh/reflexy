import { getViewSizeQueryMap } from '@js-toolkit/web-utils/responsive/getViewSizeQueryMap';

/** Returns custom media queries like object `{ ['--xxs']: '(max-width: 479px)', ... }` */
export default function exportMediaQueries(): Record<string, string> {
  return Object.entries(getViewSizeQueryMap()).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {}
  );
}
