import { useRef } from 'react';
import useTheme from '@mui/system/useTheme';
import { spaceToCssValue } from '../utils';
import type { Space } from '../Flex';
import useFlexDefaults from './useFlexDefaults';

export interface UseFlexUtilsResult {
  readonly spaceToCss: (space: Space) => string;
}

export default function useFlexUtils(useThemeHook: typeof useTheme = useTheme): UseFlexUtilsResult {
  const defaults = useFlexDefaults(useThemeHook);

  const defaultsRef = useRef(defaults);
  defaultsRef.current = defaults;

  const resultRef = useRef<UseFlexUtilsResult>(undefined as never);

  if (!resultRef.current) {
    resultRef.current = {
      spaceToCss: (space: Space) =>
        spaceToCssValue(space, defaultsRef.current.defaultSizes, defaultsRef.current.defaultUnit),
    };
  }

  return resultRef.current;
}
