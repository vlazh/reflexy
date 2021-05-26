import React from 'react';
import sharedDefaults from '../sharedDefaults';
import type { SpaceSize, SpaceUnit } from './Flex';

export function defaultClassNameTransformer(calcClassName: string, userClassName?: string): string {
  return userClassName ? `${calcClassName} ${userClassName}` : calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties,
  userStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  return userStyle || calcStyle ? { ...calcStyle, ...userStyle } : calcStyle;
}

function getSize(multiplier: number, unit: SpaceUnit): number {
  if (typeof unit === 'number') return multiplier * unit;
  return multiplier;
}

export function toCssValue(
  value: boolean | number | SpaceSize,
  sizeMultipliers: Record<SpaceSize, number> = sharedDefaults.defaultSizes,
  defaultMultiplier: number = sizeMultipliers[sharedDefaults.defaultSize],
  unit: SpaceUnit = sharedDefaults.defaultUnit
): string {
  const unitStr = typeof unit === 'number' ? 'px' : unit;
  if (value === true) return `${getSize(defaultMultiplier, unit)}${unitStr}`;
  if (typeof value === 'string') return `${getSize(sizeMultipliers[value], unit)}${unitStr}`;
  return `${getSize(+value * defaultMultiplier, unit)}${unitStr}`;
}
