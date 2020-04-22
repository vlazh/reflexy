import React from 'react';
import type { DefaultSpaceSize } from './Flex';

export function defaultClassNameTransformer(calcClassName: string, userClassName?: string): string {
  return userClassName ? `${calcClassName} ${userClassName}` : calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties,
  userStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  return userStyle || calcStyle ? { ...calcStyle, ...userStyle } : calcStyle;
}

export function toCssValue(
  value: boolean | number | DefaultSpaceSize,
  defaultSizes: Record<DefaultSpaceSize, number>,
  defaultSize: number,
  unit: string
): string {
  if (value === true) return `${defaultSize}${unit}`;
  if (typeof value === 'string') return `${defaultSizes[value]}${unit}`;
  return `${+value * defaultSize}${unit}`;
}
