/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import React, { useMemo } from 'react';
import Flex, { ComponentOrElement, FlexAllProps, DefaultComponentType } from '../Flex';

export type DefaultSpaceSize = 's' | 'm' | 'l';

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

export type SpaceAllProps<C extends ComponentOrElement = DefaultComponentType> = SpaceProps &
  FlexAllProps<C>;

function toCssValue(value: boolean | number, size: number, unit: string): string {
  return value === true ? `${size}${unit}` : `${+value * size}${unit}`;
}

function Space<C extends ComponentOrElement = DefaultComponentType>({
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
}: SpaceAllProps<C>): JSX.Element {
  const { mt = my, mr = mx, mb = my, ml = mx, pt = py, pr = px, pb = py, pl = px, ...rest } = other;

  const marginSize = useMemo(
    () => (typeof mSize === 'number' ? mSize : Space.defaultSizes[mSize]),
    [mSize]
  );
  const paddingSize = useMemo(
    () => (typeof pSize === 'number' ? pSize : Space.defaultSizes[pSize]),
    [pSize]
  );

  const spaceStyles: React.CSSProperties = useMemo(
    () =>
      Object.entries({
        margin: m != null ? toCssValue(m, marginSize, unit) : undefined,
        marginTop: mt != null ? toCssValue(mt, marginSize, unit) : undefined,
        marginRight: mr != null ? toCssValue(mr, marginSize, unit) : undefined,
        marginBottom: mb != null ? toCssValue(mb, marginSize, unit) : undefined,
        marginLeft: ml != null ? toCssValue(ml, marginSize, unit) : undefined,

        padding: p != null ? toCssValue(p, paddingSize, unit) : undefined,
        paddingTop: pt != null ? toCssValue(pt, paddingSize, unit) : undefined,
        paddingRight: pr != null ? toCssValue(pr, paddingSize, unit) : undefined,
        paddingBottom: pb != null ? toCssValue(pb, paddingSize, unit) : undefined,
        paddingLeft: pl != null ? toCssValue(pl, paddingSize, unit) : undefined,
      })
        .filter(([_, v]) => !!v)
        .reduce((acc, [k, v]) => {
          acc[k] = v;
          return acc;
        }, {}),
    [m, marginSize, mb, ml, mr, mt, p, paddingSize, pb, pl, pr, pt, unit]
  );

  const styles = style ? { ...spaceStyles, ...style } : spaceStyles;

  return <Flex style={styles} {...rest} />;
}

/** Default measure of space */
Space.defaultUnit = 'rem';

/** Predefined default space sizes */
Space.defaultSizes = {
  /* small size */
  s: 0.5,
  /** medium size */
  m: 1,
  /** large size */
  l: 2,
} as Record<DefaultSpaceSize, number>;

Space.S = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: SpaceAllProps<C> & React.Attributes) => <Space mSize="s" pSize="s" {...rest as any} />;

Space.M = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: SpaceAllProps<C> & React.Attributes) => <Space mSize="m" pSize="m" {...rest as any} />;

Space.L = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: SpaceAllProps<C> & React.Attributes) => <Space mSize="l" pSize="l" {...rest as any} />;

export default Space;
