import React from 'react';
import type { DefaultSpaceSize, SpaceUnit } from './Flex';

export function defaultClassNameTransformer(calcClassName: string, userClassName?: string): string {
  return userClassName ? `${calcClassName} ${userClassName}` : calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties,
  userStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  return userStyle || calcStyle ? { ...calcStyle, ...userStyle } : calcStyle;
}

function getSize(size: number, unit: SpaceUnit): number {
  if (typeof unit === 'number') return size * unit;
  return size;
}

export function toCssValue(
  value: boolean | number | DefaultSpaceSize,
  defaultSizes: Record<DefaultSpaceSize, number>,
  defaultSize: number,
  unit: SpaceUnit
): string {
  const unitStr = typeof unit === 'number' ? 'px' : unit;
  if (value === true) return `${getSize(defaultSize, unit)}${unitStr}`;
  if (typeof value === 'string') return `${getSize(defaultSizes[value], unit)}${unitStr}`;
  return `${getSize(+value * defaultSize, unit)}${unitStr}`;
}
