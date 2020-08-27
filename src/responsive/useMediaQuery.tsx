import { useEffect, useState, useCallback } from 'react';
import MediaQueries, { ViewSize, MediaQueryEventHandler } from './MediaQueries';

export default function useMediaQuery(): ViewSize {
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

  MediaQueries.viewSizeValues;
  return currentViewSize;
}
