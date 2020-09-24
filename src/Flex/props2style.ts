import type { SpaceProps, FlexProps, SpaceSize } from './Flex';
import { toCssValue } from './utils';

export default function props2style(
  {
    basis,
    order,
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
  }: FlexProps &
    Omit<SpaceProps, 'mSize' | 'mUnit' | 'pSize' | 'pUnit'> & {
      mSize: number;
      mUnit: NonNullable<SpaceProps['mUnit']>;
      pSize: number;
      pUnit: NonNullable<SpaceProps['pUnit']>;
    },
  defaultSizes: Record<SpaceSize, number>
): React.CSSProperties {
  return Object.entries({
    flexBasis: typeof basis === 'number' && basis !== 0 ? basis : undefined,
    order: order != null ? order : undefined,
    width: typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

    margin: m != null ? toCssValue(m, defaultSizes, mSize, mUnit) : undefined,
    marginTop: mt != null ? toCssValue(mt, defaultSizes, mSize, mUnit) : undefined,
    marginRight: mr != null ? toCssValue(mr, defaultSizes, mSize, mUnit) : undefined,
    marginBottom: mb != null ? toCssValue(mb, defaultSizes, mSize, mUnit) : undefined,
    marginLeft: ml != null ? toCssValue(ml, defaultSizes, mSize, mUnit) : undefined,

    padding: p != null ? toCssValue(p, defaultSizes, pSize, pUnit) : undefined,
    paddingTop: pt != null ? toCssValue(pt, defaultSizes, pSize, pUnit) : undefined,
    paddingRight: pr != null ? toCssValue(pr, defaultSizes, pSize, pUnit) : undefined,
    paddingBottom: pb != null ? toCssValue(pb, defaultSizes, pSize, pUnit) : undefined,
    paddingLeft: pl != null ? toCssValue(pl, defaultSizes, pSize, pUnit) : undefined,
  }).reduce((acc, [k, v]) => {
    if (v == null) return acc;
    acc[k] = v;
    return acc;
  }, {});
}
