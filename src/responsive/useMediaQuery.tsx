import { useEffect, useState, useCallback, useMemo } from 'react';
import MediaQueries, { ViewSize, MediaQueryEventHandler, ViewSizeNumber } from './MediaQueries';

export type UseMediaQueryResult = [ViewSize, ViewSizeNumber];

export default function useMediaQuery(): UseMediaQueryResult {
  const [currentViewSize, setViewSize] = useState(() => MediaQueries.init());

  const changeHandler = useCallback<MediaQueryEventHandler>(
    ({ matches, viewSize }) => matches && setViewSize(viewSize),
    []
  );

  useEffect(() => {
    MediaQueries.addListener(changeHandler);

    return () => {
      MediaQueries.removeListener(changeHandler);
    };
  }, [changeHandler]);

  return useMemo(() => [currentViewSize, ViewSizeNumber[currentViewSize]], [currentViewSize]);
}
