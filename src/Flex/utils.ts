import { getCssValue, spaceToCssValue } from '../utils';
import type { Space, SpaceSize, SpaceUnit } from './types';

export function toCssValue(
  size: boolean | Space,
  sizeMultipliers: Record<SpaceSize, number>,
  defaultMultiplier: number,
  unit: SpaceUnit
): string {
  if (size === true) return getCssValue(defaultMultiplier, unit);
  if (size === false) return `0`;
  return spaceToCssValue(size, sizeMultipliers, unit);
}
