import { useEffect, useState, useCallback, useMemo } from 'react';
import MediaQueryListener from './MediaQueryListener';
import MediaQuery, {
  ViewSize,
  MediaQueryEventHandler,
  ViewSizeNumber,
  MediaQueryInitOptions,
} from './MediaQuery';

export interface UseMediaQueryProps extends MediaQueryInitOptions {
  localInstance?: boolean;
}

export type UseMediaQueryResult = [ViewSize, ViewSizeNumber];

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

  return useMemo(() => [currentViewSize, ViewSizeNumber[currentViewSize]], [currentViewSize]);
}
