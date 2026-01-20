import type React from 'react';
import '@js-toolkit/utils/types';
import { hasIn } from '@js-toolkit/utils/hasIn';
import type {
  FlexProps,
  Gap,
  OverflowProps,
  Space,
  SpaceSize,
  SpaceUnit,
  SSpaceSize,
  USpace,
} from './propsTypes';
import type { SharedDefaults } from './sharedDefaults';

export function defaultClassNameTransformer(calcClassName: string, userClassName?: string): string {
  if (calcClassName && userClassName) return `${calcClassName} ${userClassName}`;
  return userClassName || calcClassName;
}

export function defaultStyleTransformer(
  calcStyle?: React.CSSProperties,
  userStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  if (userStyle && calcStyle) return { ...calcStyle, ...userStyle };
  return userStyle ?? calcStyle;
}

export function getCssValue(space: number, unit: SpaceUnit): string {
  const value = typeof unit === 'number' ? space * unit : space;
  const cssUnit = typeof unit === 'number' ? 'px' : unit;
  return `${value}${cssUnit}`;
}

export function getAbsSpaceSize(size: SpaceSize | SSpaceSize): SpaceSize {
  if (size.startsWith('-')) return size.substring(1) as SpaceSize;
  return size as SpaceSize;
}

export function getSpaceSizeMultiplier(
  size: Space,
  sizeMultipliers: Record<SpaceSize, number>
): number {
  return typeof size === 'number' ? size : sizeMultipliers[getAbsSpaceSize(size)];
}

export function getSpace<S>(space: S | boolean, defaultSpace: S): 0 | S {
  if (space === true) return defaultSpace;
  return space === false ? 0 : space;
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
  unit?: SpaceUnit
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
    if (size.startsWith('-'))
      return `-${getCssValue(sizeMultipliers[size.substring(1) as SpaceSize], unit)}`;
    return getCssValue(sizeMultipliers[size as SpaceSize], unit);
  }
  return getCssValue(size, unit);
}

// export function paddingToCssValue(
//   padding: Padding,
//   defaults: Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>
// ): string;

// export function paddingToCssValue(
//   padding: Padding,
//   sizeMultipliers: Record<SpaceSize, number>,
//   unit: SpaceUnit
// ): string;

// export function paddingToCssValue(
//   padding: Padding,
//   sizeMultipliersOrDefaults:
//     | Record<SpaceSize, number>
//     | Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>,
//   unit?: SpaceUnit
// ): string;

// export function paddingToCssValue(
//   padding: Padding,
//   sizeMultipliersOrDefaults:
//     | Record<SpaceSize, number>
//     | Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>,
//   unit?: SpaceUnit
// ): string {
//   if (typeof padding === 'string' && padding.length >= 3) {
//     const parts = padding.split(' ');
//     if (parts.length >= 2) {
//       // const [py, px] = parts;
//       // const [pt, px, pb] = parts;
//       // const [pt, pr, pb, pl] = parts;
//       return parts.reduce((acc, part) => {
//         const space = (Number.isFinite(+part) ? +part : part) as USpace;
//         const css = spaceToCssValue(space, sizeMultipliersOrDefaults, unit);
//         return acc + (acc.length > 0 ? ' ' : '') + css;
//       }, '');
//     }
//   }
//   return spaceToCssValue(padding as USpace, sizeMultipliersOrDefaults, unit);
// }

export function gapToCssValue(
  gap: Gap,
  defaults: Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>
): string;

export function gapToCssValue(
  gap: Gap,
  sizeMultipliers: Record<SpaceSize, number>,
  unit: SpaceUnit
): string;

export function gapToCssValue(
  gap: Gap,
  sizeMultipliersOrDefaults:
    | Record<SpaceSize, number>
    | Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>,
  unit?: SpaceUnit
): string;

export function gapToCssValue(
  gap: Gap,
  sizeMultipliersOrDefaults:
    | Record<SpaceSize, number>
    | Pick<SharedDefaults, 'defaultSizes' | 'defaultUnit'>,
  unit?: SpaceUnit
): string {
  if (typeof gap === 'string' && gap.length >= 3) {
    const parts = gap.split(' ');
    if (parts.length >= 2) {
      const [row, col] = parts;
      const rowSpace = (Number.isFinite(+row) ? +row : row) as USpace;
      const colSpace = (Number.isFinite(+col) ? +col : col) as USpace;
      const rowCss = spaceToCssValue(rowSpace, sizeMultipliersOrDefaults, unit);
      const colCss = spaceToCssValue(colSpace, sizeMultipliersOrDefaults, unit);
      return `${rowCss} ${colCss}`;
    }
  }
  return spaceToCssValue(gap as USpace, sizeMultipliersOrDefaults, unit);
}

export function fillToCssValue(propValue: FlexProps['vfill']): string | undefined {
  return typeof propValue === 'number'
    ? `${Math.min(propValue, 1) * 100}%`
    : (propValue && '100%') || undefined;
}

export function scrollableToCssValue(
  scrollableValue: OverflowProps['scrollable']
): OverflowProps['overflow'] {
  return typeof scrollableValue === 'string'
    ? scrollableValue
    : (scrollableValue === true && 'auto') || (scrollableValue === false && 'hidden') || undefined;
}
