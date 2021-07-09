import MediaQuery from './MediaQuery';

/** Returns custom media queries like object `{ ['--xxs']: '(max-width: 479px)', ... }` */
export default function exportMediaQueries(): Record<string, string> {
  return Object.entries(MediaQuery.listener.queries).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {}
  );
}
