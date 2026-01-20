import type React from 'react';
import type { SpaceProps, FlexProps, SpaceSize } from '../propsTypes';
import { gapToCssValue, getSpace, spaceToCssValue } from '../utils';

export default function props2style(
  {
    basis,
    order,
    grow,
    shrink,
    hfill,
    vfill,

    mSize,
    mUnit,
    mb,
    ml,
    mr,
    mt,
    pSize,
    pUnit,
    pb,
    pl,
    pr,
    pt,
    gapSize,
    gapUnit,
    gap,
    columnGap,
    rowGap,
  }: RequiredKeepUndefined<
    Pick<FlexProps, 'basis' | 'order' | 'grow' | 'shrink' | 'hfill' | 'vfill'> &
      OmitStrict<
        SpaceProps,
        | 'mSize'
        | 'mUnit'
        | 'pSize'
        | 'pUnit'
        | 'gapSize'
        | 'gapUnit'
        | 'unit'
        | 'm'
        | 'mx'
        | 'my'
        | 'p'
        | 'px'
        | 'py'
      > & {
        mSize: number;
        mUnit: NonNullable<SpaceProps['mUnit']>;
        pSize: number;
        pUnit: NonNullable<SpaceProps['pUnit']>;
        gapSize: number;
        gapUnit: NonNullable<SpaceProps['gapUnit']>;
      }
  >,
  defaultSizes: Record<SpaceSize, number>
): React.CSSProperties {
  return Object.entries({
    flexBasis: typeof basis === 'number' && basis !== 0 ? basis : undefined,
    order: order ?? undefined,
    grow: grow != null && +grow > 24 ? grow : undefined,
    shrink: shrink != null && +shrink > 24 ? shrink : undefined,
    width: typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

    marginTop: mt != null ? spaceToCssValue(getSpace(mt, mSize), defaultSizes, mUnit) : undefined,
    marginRight: mr != null ? spaceToCssValue(getSpace(mr, mSize), defaultSizes, mUnit) : undefined,
    marginBottom:
      mb != null ? spaceToCssValue(getSpace(mb, mSize), defaultSizes, mUnit) : undefined,
    marginLeft: ml != null ? spaceToCssValue(getSpace(ml, mSize), defaultSizes, mUnit) : undefined,

    paddingTop: pt != null ? spaceToCssValue(getSpace(pt, pSize), defaultSizes, pUnit) : undefined,
    paddingRight:
      pr != null ? spaceToCssValue(getSpace(pr, pSize), defaultSizes, pUnit) : undefined,
    paddingBottom:
      pb != null ? spaceToCssValue(getSpace(pb, pSize), defaultSizes, pUnit) : undefined,
    paddingLeft: pl != null ? spaceToCssValue(getSpace(pl, pSize), defaultSizes, pUnit) : undefined,

    gap: gap != null ? gapToCssValue(getSpace(gap, gapSize), defaultSizes, gapUnit) : undefined,
    columnGap:
      columnGap != null
        ? spaceToCssValue(getSpace(columnGap, gapSize), defaultSizes, gapUnit)
        : undefined,
    rowGap:
      rowGap != null
        ? spaceToCssValue(getSpace(rowGap, gapSize), defaultSizes, gapUnit)
        : undefined,
  }).reduce((acc, [k, v]) => {
    if (v == null) return acc;
    acc[k] = v;
    return acc;
  }, {} as AnyObject);
}
