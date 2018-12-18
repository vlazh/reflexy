import React from 'react';
import Flex, { AllProps } from '../Flex';

export type DefaultSpaceSize = 's' | 'm' | 'l';

const spaceMeasure = 'rem';

const spaceSizes: Record<DefaultSpaceSize, number> = {
  s: 0.5,
  m: 1,
  l: 2,
};

export interface SpaceProps {
  mSize?: DefaultSpaceSize | number;
  m?: boolean | number;
  mt?: boolean | number;
  mr?: boolean | number;
  mb?: boolean | number;
  ml?: boolean | number;
  mx?: boolean | number;
  my?: boolean | number;
  pSize?: DefaultSpaceSize | number;
  p?: boolean;
  pt?: boolean;
  pr?: boolean;
  pb?: boolean;
  pl?: boolean;
  px?: boolean;
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

Space.spaceSizes = spaceSizes;
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
