import React from 'react';
import Flex, { AllProps } from '../Flex';

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

function Space<P = {}>(props: SpaceProps & AllProps<P>) {
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
    margin: m != null ? toCssValue(m, marginSize) : undefined,
    marginTop: mt != null ? toCssValue(mt, marginSize) : undefined,
    marginRight: mr != null ? toCssValue(mr, marginSize) : undefined,
    marginBottom: mb != null ? toCssValue(mb, marginSize) : undefined,
    marginLeft: ml != null ? toCssValue(ml, marginSize) : undefined,

    padding: p != null ? toCssValue(p, paddingSize) : undefined,
    paddingTop: pt != null ? toCssValue(pt, paddingSize) : undefined,
    paddingRight: pr != null ? toCssValue(pr, paddingSize) : undefined,
    paddingBottom: pb != null ? toCssValue(pb, paddingSize) : undefined,
    paddingLeft: pl != null ? toCssValue(pl, paddingSize) : undefined,

    ...style,
  };

  return <Flex style={styles} {...rest} />;
}

/** Predefined default space sizes */
Space.spaceSizes = spaceSizes;
/** Default measure of space */
Space.spaceMeasure = spaceMeasure;

Space.S = <P extends any>({
  mSize,
  pSize,
  ...rest
}: SpaceProps & AllProps<P> & React.Attributes) => <Space mSize="s" pSize="s" {...rest} />;

Space.M = <P extends any>({
  mSize,
  pSize,
  ...rest
}: SpaceProps & AllProps<P> & React.Attributes) => <Space mSize="m" pSize="m" {...rest} />;

Space.L = <P extends any>({
  mSize,
  pSize,
  ...rest
}: SpaceProps & AllProps<P> & React.Attributes) => <Space mSize="l" pSize="l" {...rest} />;

export default Space;
