import type React from 'react';
import sharedDefaults from '../sharedDefaults';
import type { SpaceSize, SpaceUnit, SSpaceSize } from './Flex';

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

function getSize(multiplier: number, unit: SpaceUnit): number {
  if (typeof unit === 'number') return multiplier * unit;
  return multiplier;
}

export function getSpaceSize(value: SpaceSize | SSpaceSize): SpaceSize {
  if (value[0] === '-') return value.substring(1) as SpaceSize;
  return value as SpaceSize;
}

export function toCssValue(
  value: boolean | number | SpaceSize | SSpaceSize,
  sizeMultipliers: Record<SpaceSize, number> = sharedDefaults.defaultSizes,
  defaultMultiplier: number = sizeMultipliers[sharedDefaults.defaultSize],
  unit: SpaceUnit = sharedDefaults.defaultUnit
): string {
  const unitStr = typeof unit === 'number' ? 'px' : unit;
  if (value === true) return `${getSize(defaultMultiplier, unit)}${unitStr}`;
  if (typeof value === 'string') {
    if (value[0] === '-')
      return `-${getSize(sizeMultipliers[value.substring(1) as SpaceSize], unit)}${unitStr}`;
    return `${getSize(sizeMultipliers[value as SpaceSize], unit)}${unitStr}`;
  }
  return `${getSize(+value * defaultMultiplier, unit)}${unitStr}`;
}
