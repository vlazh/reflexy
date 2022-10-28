import type React from 'react';
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

export function getCssValue(size: number, unit: SpaceUnit): string {
  const value = typeof unit === 'number' ? size * unit : size;
  const cssUnit = typeof unit === 'number' ? 'px' : unit;
  return `${value}${cssUnit}`;
}

export function getAbsSpaceSize(size: SpaceSize | SSpaceSize): SpaceSize {
  if (size[0] === '-') return size.substring(1) as SpaceSize;
  return size as SpaceSize;
}

export function sizeToCssValue(
  size: number | SpaceSize | SSpaceSize,
  sizeMultipliers: Record<SpaceSize, number>,
  unit: SpaceUnit
): string {
  if (typeof size === 'string') {
    if (size[0] === '-')
      return `-${getCssValue(sizeMultipliers[size.substring(1) as SpaceSize], unit)}`;
    return getCssValue(sizeMultipliers[size as SpaceSize], unit);
  }
  return getCssValue(size, unit);
}
