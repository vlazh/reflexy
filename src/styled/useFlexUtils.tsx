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

  const ref = useRef<UseFlexUtilsResult>(undefined as never);

  if (!ref.current) {
    ref.current = {
      spaceToCss: (space: Space) =>
        spaceToCssValue(space, defaults.defaultSizes, defaults.defaultUnit),
    };
  }

  return ref.current;
}
