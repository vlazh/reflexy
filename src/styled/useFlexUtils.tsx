import { useRef } from 'react';
import { spaceToCssValue } from '../utils';
import type { Space } from '../Flex';
import useFlexDefaults from './useFlexDefaults';

export interface UseFlexUtilsResult {
  readonly spaceToCss: (space: Space) => string;
  readonly spaceToNumber: (space: Space) => number;
}

export default function useFlexUtils(): UseFlexUtilsResult {
  const defaults = useFlexDefaults();

  const defaultsRef = useRef(defaults);
  defaultsRef.current = defaults;

  const resultRef = useRef<UseFlexUtilsResult>(undefined as never);

  if (!resultRef.current) {
    resultRef.current = {
      spaceToCss: (space: Space) =>
        spaceToCssValue(space, defaultsRef.current.defaultSizes, defaultsRef.current.defaultUnit),
      spaceToNumber: (space: Space) =>
        Number.parseFloat(
          spaceToCssValue(space, defaultsRef.current.defaultSizes, defaultsRef.current.defaultUnit)
        ),
    };
  }

  return resultRef.current;
}
