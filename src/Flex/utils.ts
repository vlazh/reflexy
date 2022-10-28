import { getCssValue, sizeToCssValue } from '../utils';
import type { SpaceSize, SpaceUnit, SSpaceSize } from './Flex';

export function toCssValue(
  size: boolean | number | SpaceSize | SSpaceSize,
  sizeMultipliers: Record<SpaceSize, number>,
  defaultMultiplier: number,
  unit: SpaceUnit
): string {
  if (size === true) return getCssValue(defaultMultiplier, unit);
  if (size === false) return `0`;
  return sizeToCssValue(size, sizeMultipliers, unit);
}
