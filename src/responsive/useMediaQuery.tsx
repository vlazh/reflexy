import { useEffect, useState, useCallback, useMemo } from 'react';
import MediaQueryListener from './MediaQueryListener';
import MediaQuery, { type MediaQueryEventHandler, type MediaQueryInitOptions } from './MediaQuery';
import ViewSize from './ViewSize';

export interface UseMediaQueryProps extends MediaQueryInitOptions {
  localInstance?: boolean | undefined;
}

export type UseMediaQueryResult = [ViewSize, number];

export default function useMediaQuery({
  localInstance,
  ...rest
}: UseMediaQueryProps = {}): UseMediaQueryResult {
  const listener = useMemo(() => {
    if (localInstance) {
      return new MediaQueryListener(rest);
    }
    MediaQuery.init(rest);
    return MediaQuery;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentViewSize, setViewSize] = useState(() => listener.currentViewSize);

  const changeHandler = useCallback<MediaQueryEventHandler>(
    ({ matches, viewSize }) => matches && setViewSize(viewSize),
    []
  );

  useEffect(() => {
    listener.addListener(changeHandler);

    return () => {
      listener.removeListener(changeHandler);
    };
  }, [changeHandler, listener]);

  return useMemo(() => [currentViewSize, currentViewSize], [currentViewSize]);
}
