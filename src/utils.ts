import type React from 'react';
import '@js-toolkit/utils/types';
import { hasIn } from '@js-toolkit/utils/hasIn';
import type Flex from './Flex';
import type { Space, SpaceSize, SpaceUnit, SSpaceSize } from './Flex';
import type { SharedDefaults } from './sharedDefaults';

export const REFLEXY_KEY = Symbol.for('@reflexy');

export function copyInternalProps<T extends React.ComponentType<any>>(
  source: typeof Flex,
  target: T
): T {
  (target as AnyObject)[REFLEXY_KEY] = source[REFLEXY_KEY];
  return target;
}

export function defaultClassNameTransformer(calcClassName: string, userClassName?: string): string {
  if (calcClassName && userClassName) return `${calcClassName} ${userClassName}`;
  return userClassName || calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties,
  userStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  if (userStyle && calcStyle) return { ...calcStyle, ...userStyle };
  return userStyle || calcStyle;
}

export function getCssValue(space: number, unit: SpaceUnit): string {
  const value = typeof unit === 'number' ? space * unit : space;
  const cssUnit = typeof unit === 'number' ? 'px' : unit;
  return `${value}${cssUnit}`;
}

export function getAbsSpaceSize(size: SpaceSize | SSpaceSize): SpaceSize {
  if (size[0] === '-') return size.substring(1) as SpaceSize;
  return size as SpaceSize;
}

export function getSpaceSizeMultiplier(
  size: Space,
  sizeMultipliers: Record<SpaceSize, number>
): number {
  return typeof size === 'number' ? size : sizeMultipliers[getAbsSpaceSize(size)];
}

export function getSpace(space: Space | boolean, defaultSpace: Space): Space {
  return space === true ? defaultSpace : 0;
}

export function spaceToCssValue(
  size: Space,
  defaults: Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>
): string;

export function spaceToCssValue(
  size: Space,
  sizeMultipliers: Record<SpaceSize, number>,
  unit: SpaceUnit
): string;

export function spaceToCssValue(
  size: Space,
  sizeMultipliersOrDefaults:
    | Record<SpaceSize, number>
    | Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>,
  unit0?: SpaceUnit
): string {
  const [sizeMultipliers, unit] = hasIn(sizeMultipliersOrDefaults, 'defaultUnit')
    ? [sizeMultipliersOrDefaults.defaultSizes, sizeMultipliersOrDefaults.defaultUnit]
    : [sizeMultipliersOrDefaults, unit0!];
  if (typeof size === 'string') {
    if (size[0] === '-')
      return `-${getCssValue(sizeMultipliers[size.substring(1) as SpaceSize], unit)}`;
    return getCssValue(sizeMultipliers[size as SpaceSize], unit);
  }
  return getCssValue(size, unit);
}
