import React from 'react';
import Flex, { FlexAllProps } from '../Flex';

export type DefaultSpaceSize = 's' | 'm' | 'l';

const defaultSpaceSizes: Record<DefaultSpaceSize, number> = {
  /* small size */
  s: 0.5,
  /** medium size */
  m: 1,
  /** large size */
  l: 2,
};

export interface SpaceProps {
  /** Measure unit of space */
  unit?: string;
  /** Size of margin */
  mSize?: DefaultSpaceSize | number;
  /** margin */
  m?: boolean | number;
  /** margin-top */
  mt?: boolean | number;
  /** margin-right */
  mr?: boolean | number;
  /** margin-bottom */
  mb?: boolean | number;
  /** margin-left */
  ml?: boolean | number;
  /** margin by x axis: margin-left & margin-right */
  mx?: boolean | number;
  /** margin by y axis: margin-top & margin-bottom */
  my?: boolean | number;
  /** Size of padding */
  pSize?: DefaultSpaceSize | number;
  /** padding */
  p?: boolean | number;
  /** padding-top */
  pt?: boolean | number;
  /** padding-right */
  pr?: boolean | number;
  /** padding-bottom */
  pb?: boolean | number;
  /** padding-left */
  pl?: boolean | number;
  /** padding by x axis: padding-left & padding-right */
  px?: boolean | number;
  /** padding by y axis: padding-top & padding-bottom */
  py?: boolean | number;
}

export type SpaceAllProps = SpaceProps & FlexAllProps;

function toCssValue(v: boolean | number, size: string, unit: string): string {
  return v === true ? size : `${+v}${unit}`;
}

function Space(props: SpaceAllProps): ReturnType<typeof Flex> {
  const {
    mSize = 'm',
    m,
    mx,
    my,

    pSize = 'm',
    p,
    px,
    py,

    unit = Space.defaultUnit,
    style,
    ...other
  } = props;

  const { mt = my, mr = mx, mb = my, ml = mx, pt = py, pr = px, pb = py, pl = px, ...rest } = other;

  const marginSize =
    typeof mSize === 'number' ? `${mSize}${unit}` : `${Space.defaultSizes[mSize]}${unit}`;
  const paddingSize =
    typeof pSize === 'number' ? `${pSize}${unit}` : `${Space.defaultSizes[pSize]}${unit}`;

  const styles: React.CSSProperties = {
    ...(m != null ? { margin: toCssValue(m, marginSize, unit) } : undefined),
    ...(mt != null ? { marginTop: toCssValue(mt, marginSize, unit) } : undefined),
    ...(mr != null ? { marginRight: toCssValue(mr, marginSize, unit) } : undefined),
    ...(mb != null ? { marginBottom: toCssValue(mb, marginSize, unit) } : undefined),
    ...(ml != null ? { marginLeft: toCssValue(ml, marginSize, unit) } : undefined),

    ...(p != null ? { padding: toCssValue(p, paddingSize, unit) } : undefined),
    ...(pt != null ? { paddingTop: toCssValue(pt, paddingSize, unit) } : undefined),
    ...(pr != null ? { paddingRight: toCssValue(pr, paddingSize, unit) } : undefined),
    ...(pb != null ? { paddingBottom: toCssValue(pb, paddingSize, unit) } : undefined),
    ...(pl != null ? { paddingLeft: toCssValue(pl, paddingSize, unit) } : undefined),

    ...style,
  };

  return <Flex style={styles} {...rest} />;
}

/** Predefined default space sizes */
Space.defaultSizes = defaultSpaceSizes;
/** Default measure of space */
Space.defaultUnit = 'rem';

Space.S = ({ mSize, pSize, ...rest }: SpaceProps & FlexAllProps & React.Attributes) => (
  <Space mSize="s" pSize="s" {...rest} />
);

Space.M = ({ mSize, pSize, ...rest }: SpaceProps & FlexAllProps & React.Attributes) => (
  <Space mSize="m" pSize="m" {...rest} />
);

Space.L = ({ mSize, pSize, ...rest }: SpaceProps & FlexAllProps & React.Attributes) => (
  <Space mSize="l" pSize="l" {...rest} />
);

export default Space;
