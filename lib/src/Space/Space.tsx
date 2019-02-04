import React from 'react';
import Flex, { FlexAllProps } from '../Flex';

export type DefaultSpaceSize = 's' | 'm' | 'l';

const spaceMeasure = 'rem';

const spaceSizes: Record<DefaultSpaceSize, number> = {
  /* small size */
  s: 0.5,
  /** medium size */
  m: 1,
  /** large size */
  l: 2,
};

export interface SpaceProps {
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
  p?: boolean;
  /** padding-top */
  pt?: boolean;
  /** padding-right */
  pr?: boolean;
  /** padding-bottom */
  pb?: boolean;
  /** padding-left */
  pl?: boolean;
  /** padding by x axis: padding-left & padding-right */
  px?: boolean;
  /** padding by y axis: padding-top & padding-bottom */
  py?: boolean;
}

function toCssValue(v: boolean | number, size: string) {
  return v === true ? size : `${+v}${spaceMeasure}`;
}

function Space(props: SpaceProps & FlexAllProps): ReturnType<typeof Flex> {
  const {
    mSize = 'm',
    m,
    mx,
    my,

    pSize = 'm',
    p,
    px,
    py,

    style,
    ...other
  } = props;

  const { mt = my, mr = mx, mb = my, ml = mx, pt = py, pr = px, pb = py, pl = px, ...rest } = other;

  const marginSize =
    typeof mSize === 'number' ? `${mSize}${spaceMeasure}` : `${spaceSizes[mSize]}${spaceMeasure}`;
  const paddingSize =
    typeof pSize === 'number' ? `${pSize}${spaceMeasure}` : `${spaceSizes[pSize]}${spaceMeasure}`;

  const styles: React.CSSProperties = {
    ...(m != null ? { margin: toCssValue(m, marginSize) } : undefined),
    ...(mt != null ? { marginTop: toCssValue(mt, marginSize) } : undefined),
    ...(mr != null ? { marginRight: toCssValue(mr, marginSize) } : undefined),
    ...(mb != null ? { marginBottom: toCssValue(mb, marginSize) } : undefined),
    ...(ml != null ? { marginLeft: toCssValue(ml, marginSize) } : undefined),

    ...(p != null ? { padding: toCssValue(p, paddingSize) } : undefined),
    ...(pt != null ? { paddingTop: toCssValue(pt, paddingSize) } : undefined),
    ...(pr != null ? { paddingRight: toCssValue(pr, paddingSize) } : undefined),
    ...(pb != null ? { paddingBottom: toCssValue(pb, paddingSize) } : undefined),
    ...(pl != null ? { paddingLeft: toCssValue(pl, paddingSize) } : undefined),

    ...style,
  };

  return <Flex style={styles} {...rest} />;
}

/** Predefined default space sizes */
Space.spaceSizes = spaceSizes;
/** Default measure of space */
Space.spaceMeasure = spaceMeasure;

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
