import type React from 'react';
import '@js-toolkit/utils/types';
import { gapToCssValue, getSpace, spaceToCssValue } from '../utils';
import type { SpaceProps, FlexProps, SpaceSize } from './types';

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
    m,
    mb,
    ml,
    mr,
    mt,
    pSize,
    pUnit,
    p,
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
        | 'mx'
        | 'my'
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
    order: order != null ? order : undefined,
    grow: grow != null && +grow > 24 ? grow : undefined,
    shrink: shrink != null && +shrink > 24 ? shrink : undefined,
    width: typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

    margin: m != null ? spaceToCssValue(getSpace(m, mSize), defaultSizes, mUnit) : undefined,
    marginTop: mt != null ? spaceToCssValue(getSpace(mt, mSize), defaultSizes, mUnit) : undefined,
    marginRight: mr != null ? spaceToCssValue(getSpace(mr, mSize), defaultSizes, mUnit) : undefined,
    marginBottom:
      mb != null ? spaceToCssValue(getSpace(mb, mSize), defaultSizes, mUnit) : undefined,
    marginLeft: ml != null ? spaceToCssValue(getSpace(ml, mSize), defaultSizes, mUnit) : undefined,

    padding: p != null ? spaceToCssValue(getSpace(p, pSize), defaultSizes, pUnit) : undefined,
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
