import type { SpaceProps, FlexProps, DefaultSpaceSize } from './Flex';
import { toCssValue } from './utils';

export default function props2style(
  {
    basis,
    order,
    hfill,
    vfill,

    unit,
    mSize,
    m,
    mb,
    ml,
    mr,
    mt,
    pSize,
    p,
    pb,
    pl,
    pr,
    pt,
  }: FlexProps &
    Omit<SpaceProps, 'mSize' | 'pSize' | 'unit'> & {
      mSize: number;
      pSize: number;
      unit: string;
    },
  defaultSizes: Record<DefaultSpaceSize, number>
): React.CSSProperties {
  return Object.entries({
    flexBasis: typeof basis === 'number' && basis !== 0 ? basis : undefined,
    order: order != null ? order : undefined,
    width: typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

    margin: m != null ? toCssValue(m, defaultSizes, mSize, unit) : undefined,
    marginTop: mt != null ? toCssValue(mt, defaultSizes, mSize, unit) : undefined,
    marginRight: mr != null ? toCssValue(mr, defaultSizes, mSize, unit) : undefined,
    marginBottom: mb != null ? toCssValue(mb, defaultSizes, mSize, unit) : undefined,
    marginLeft: ml != null ? toCssValue(ml, defaultSizes, mSize, unit) : undefined,

    padding: p != null ? toCssValue(p, defaultSizes, pSize, unit) : undefined,
    paddingTop: pt != null ? toCssValue(pt, defaultSizes, pSize, unit) : undefined,
    paddingRight: pr != null ? toCssValue(pr, defaultSizes, pSize, unit) : undefined,
    paddingBottom: pb != null ? toCssValue(pb, defaultSizes, pSize, unit) : undefined,
    paddingLeft: pl != null ? toCssValue(pl, defaultSizes, pSize, unit) : undefined,
  }).reduce((acc, [k, v]) => {
    if (v == null) return acc;
    acc[k] = v;
    return acc;
  }, {});
}
