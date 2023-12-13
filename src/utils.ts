import type React from 'react';
import type { Space, SpaceProps, SpaceSize, SpaceUnit, SSpaceSize } from './Flex';
import type Flex from './Flex';
import type { AnyObject } from './types';
import { isRefSupported } from './isRefSupported';

export function copyInternalProps<T extends React.ComponentType<any>>(
  source: typeof Flex,
  target: T
): T {
  // eslint-disable-next-line no-param-reassign
  (target as AnyObject).reflexy = source.reflexy;
  return target;
}

export function buildRefCallback<T = any>(refs: readonly React.Ref<T>[]): React.RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(instance);
      } else if (r) {
        // eslint-disable-next-line no-param-reassign
        (r as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
}

export function buildRefProps(
  Component: React.ElementType,
  componentRefProp: unknown
): { ref: unknown } | { componentRef: unknown } | undefined {
  if (componentRefProp) {
    if (isRefSupported(Component)) return { ref: componentRefProp };
    return { componentRef: componentRefProp };
    // Component may use `componentRef` prop for nested components so it is no way to granular check
    // whether Component is Flex.
    // if (isFlex(Component)) return { componentRef: componentRefProp };
    // const componentString =
    //   typeof Component === 'object' ? JSON.stringify(Component) : String(Component);
    // console.warn(`Component '${componentString}' doesn't support 'ref'/'componentRef' prop.`);
  }
  return undefined;
}

export function defaultClassNameTransformer(
  calcClassName: string,
  userClassName?: string | undefined
): string {
  if (calcClassName && userClassName) return `${calcClassName} ${userClassName}`;
  return userClassName || calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties | undefined,
  userStyle?: React.CSSProperties | undefined
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

export const getSpaceSizeMultiplier = (
  size: NonNullable<SpaceProps['mSize']>,
  sizeMultipliers: Record<SpaceSize, number>
): number => {
  return typeof size === 'number' ? size : sizeMultipliers[getAbsSpaceSize(size)];
};

export function spaceToCssValue(
  size: Space,
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
