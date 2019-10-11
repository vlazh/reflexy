import React, { useMemo } from 'react';
import { ContentDistribution } from 'csstype';
import css from './Flex.css';

type Globals = 'inherit' | 'initial' | 'unset';
type FlexPosition = 'center' | 'flex-end' | 'flex-start';

export type JustifyContent = Globals | ContentDistribution | FlexPosition;

export type AlignItems = Globals | FlexPosition | 'baseline' | 'stretch';

export type AlignSelf = AlignItems | 'auto';

export type AlignContent = Globals | ContentDistribution | FlexPosition;

export type FlexBasis = Globals | 'auto' | 'content' | number;

export type FlexWrap = Globals | 'nowrap' | 'wrap' | 'wrap-reverse';

// prettier-ignore
type ColumnID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17  | 18 | 19 | 20 | 21 | 22 | 23 | 24;
// prettier-ignore
type ColumnStringID = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17 ' | '18' | '19' | '20' | '21' | '22' | '23' | '24';

export type Column = ColumnID | ColumnStringID | boolean;

export interface Styleable {
  /** CSS class name. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}

export interface FlexProps extends Styleable {
  /** Sets `display` to `inline-flex`. */
  inline?: boolean;
  /** Sets `flow-direction` to `row`. */
  row?: boolean;
  /** Sets `flow-direction` to `column`. Takes a precedence over `row`. */
  column?: boolean;
  /** Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`. */
  reverse?: boolean;
  /** Sets `flex-wrap` to corresponding value. Also accepts boolean value: `true` equals to `wrap`, `false` equals to `nowrap`. */
  wrap?: FlexWrap | boolean;
  /** Sets `align-content` to corresponding value. */
  alignContent?: AlignContent;
  /** Sets `align-items` to corresponding value. */
  alignItems?: AlignItems;
  /** Sets `align-self` to corresponding value. */
  alignSelf?: AlignSelf;
  /** Sets `justify-content` to corresponding value. */
  justifyContent?: JustifyContent;
  /** Sets `justifyContent` and `alignItems` to `center`. `justifyContent` and `alignItems` take a precedence over `center`. */
  center?: boolean;
  /** Sets `flex-basis` to corresponding value. */
  basis?: FlexBasis;
  /** Sets `flex-grow` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  grow?: Column;
  /** Sets `flex-shrink` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  shrink?: Column;
  /** Sets `order` to corresponding value. */
  order?: number;
  /** Stretch by horizontal or sets width in percentage (numbers in range 0.0 to 1.0 inclusive). */
  hfill?: boolean | number;
  /** Stretch by vertical or sets height in percentage (numbers in range 0.0 to 1.0 inclusive). */
  vfill?: boolean | number;
  /** Stretch by vertical and horizontal. */
  fill?: boolean;
  /**
   * Sets `min-width: 0`.
   * By default, a flex item cannot be smaller than the size of its content.
   * The initial setting on flex items is min-width: auto.
   * One way to enable flex items to shrink past their content is to set a flex item to min-width: 0. */
  widthByFlex?: boolean;
}

export type DefaultSpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export interface SpaceProps {
  /** Measure unit of space */
  unit?: string;
  /** Size of margin */
  mSize?: DefaultSpaceSize | number;
  /** margin */
  m?: boolean | number | DefaultSpaceSize;
  /** margin-top */
  mt?: boolean | number | DefaultSpaceSize;
  /** margin-right */
  mr?: boolean | number | DefaultSpaceSize;
  /** margin-bottom */
  mb?: boolean | number | DefaultSpaceSize;
  /** margin-left */
  ml?: boolean | number | DefaultSpaceSize;
  /** margin by x axis: margin-left & margin-right */
  mx?: boolean | number | DefaultSpaceSize;
  /** margin by y axis: margin-top & margin-bottom */
  my?: boolean | number | DefaultSpaceSize;
  /** Size of padding */
  pSize?: DefaultSpaceSize | number;
  /** padding */
  p?: boolean | number | DefaultSpaceSize;
  /** padding-top */
  pt?: boolean | number | DefaultSpaceSize;
  /** padding-right */
  pr?: boolean | number | DefaultSpaceSize;
  /** padding-bottom */
  pb?: boolean | number | DefaultSpaceSize;
  /** padding-left */
  pl?: boolean | number | DefaultSpaceSize;
  /** padding by x axis: padding-left & padding-right */
  px?: boolean | number | DefaultSpaceSize;
  /** padding by y axis: padding-top & padding-bottom */
  py?: boolean | number | DefaultSpaceSize;
}

export type TweakableComponentType<
  CP extends React.PropsWithChildren<Styleable> = any
> = React.ElementType<CP>;

export type TweakableComponentProps<C extends React.ElementType> = {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: C;
} & (undefined extends C
  ? unknown
  : (React.ComponentPropsWithoutRef<C> &
      ('ref' extends keyof React.ComponentPropsWithRef<C>
        ? { componentRef?: React.ComponentPropsWithRef<C>['ref'] }
        : {})));

export type DefaultComponentType = React.ElementType<JSX.IntrinsicElements['div']>;

export type FlexAndSpaceProps = FlexProps & SpaceProps;

export type FlexComponentProps<C extends TweakableComponentType = any> = FlexAndSpaceProps &
  (undefined extends C ? unknown : Omit<TweakableComponentProps<C>, 'component'>);

export type FlexAllProps<
  C extends TweakableComponentType = DefaultComponentType
> = React.PropsWithChildren<TweakableComponentProps<C> & FlexAndSpaceProps>;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends TweakableComponentType = DefaultComponentType>({
  component = 'div' as C,
  inline,
  row,
  column,
  reverse,
  wrap,
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  center,
  basis,
  grow,
  shrink,
  order,
  hfill,
  vfill,
  fill,
  widthByFlex,
  className,
  style,
  children,

  mSize = 'm',
  m,
  mx,
  my,
  pSize = 'm',
  p,
  px,
  py,
  unit = Flex.defaultUnit,

  ...other
}: FlexAllProps<C>): JSX.Element {
  const calcClassName = useMemo(
    () =>
      props2className({
        inline,
        row,
        column,
        reverse,
        wrap,
        alignContent,
        alignItems,
        alignSelf,
        justifyContent,
        center,
        basis,
        grow,
        shrink,
        hfill,
        vfill,
        fill,
        widthByFlex,
        className,
      }),
    [
      alignContent,
      alignItems,
      alignSelf,
      basis,
      center,
      className,
      column,
      fill,
      grow,
      hfill,
      inline,
      justifyContent,
      reverse,
      row,
      shrink,
      vfill,
      widthByFlex,
      wrap,
    ]
  );

  const { mt = my, mr = mx, mb = my, ml = mx, pt = py, pr = px, pb = py, pl = px, ...rest } = other;

  const marginSize = useMemo(() => (typeof mSize === 'number' ? mSize : Flex.defaultSizes[mSize]), [
    mSize,
  ]);
  const paddingSize = useMemo(
    () => (typeof pSize === 'number' ? pSize : Flex.defaultSizes[pSize]),
    [pSize]
  );

  const calcStyles = useMemo(
    () =>
      props2style({
        order,
        hfill,
        vfill,
        unit,
        mSize: marginSize,
        m,
        mb,
        ml,
        mr,
        mt,
        pSize: paddingSize,
        p,
        pb,
        pl,
        pr,
        pt,
      }),
    [hfill, m, marginSize, mb, ml, mr, mt, order, p, paddingSize, pb, pl, pr, pt, unit, vfill]
  );

  const { componentRef, ...propsWithoutRef } = rest as (typeof rest & { componentRef?: any });

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable>>,
    {
      ...propsWithoutRef,
      className: calcClassName,
      style: style ? { ...calcStyles, ...style } : calcStyles,
      ref: componentRef,
    },
    children
  );
}

/** Default measure of space */
Flex.defaultUnit = 'rem';

/** Predefined default space sizes */
Flex.defaultSizes = {
  xs: 0.25,
  s: 0.5,
  m: 1,
  l: 1.5,
  xl: 2,
  xxl: 2.5,
} as Record<DefaultSpaceSize, number>;

/* eslint-disable @typescript-eslint/no-unused-vars */
Flex.S = <C extends TweakableComponentType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="s" pSize="s" {...rest} />;

Flex.M = <C extends TweakableComponentType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="m" pSize="m" {...rest} />;

Flex.L = <C extends TweakableComponentType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="l" pSize="l" {...rest} />;
/* eslint-enable @typescript-eslint/no-unused-vars */

export default Flex;

export function props2className(
  props: Pick<
    FlexProps,
    | 'column'
    | 'row'
    | 'reverse'
    | 'grow'
    | 'shrink'
    | 'wrap'
    | 'alignItems'
    | 'center'
    | 'justifyContent'
    | 'fill'
    | 'hfill'
    | 'vfill'
    | 'alignContent'
    | 'alignSelf'
    | 'inline'
    | 'basis'
    | 'className'
    | 'widthByFlex'
  >
): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  const wrap = (props.wrap === false && 'nowrap') || (props.wrap === true && 'wrap') || props.wrap;
  const alignItems = props.alignItems || (props.center && 'center');
  const justifyContent = props.justifyContent || (props.center && 'center');
  const basis = (props.basis === 0 || typeof props.basis === 'string') && String(props.basis);
  const fill = typeof props.fill === 'boolean' ? props.fill : undefined;
  const hfill = props.hfill == null ? fill : typeof props.hfill === 'boolean' && props.hfill;
  const vfill = props.vfill == null ? fill : typeof props.vfill === 'boolean' && props.vfill;

  const className = [
    css[`display--${props.inline ? 'inline-flex' : 'flex'}`],
    row && css[`row${reverse}`],
    column && css[`column${reverse}`],
    wrap && css[`wrap--${wrap}`],
    alignItems && css[`align-items--${alignItems}`],
    props.alignContent && css[`align-content--${props.alignContent}`],
    props.alignSelf && css[`align-self--${props.alignSelf}`],
    justifyContent && css[`justify-content--${justifyContent}`],
    basis && css[`flex-basis--${basis}`],
    grow && css[`flex-grow--${grow}`],
    shrink && css[`flex-shrink--${shrink}`],
    hfill && css['fill-h'],
    vfill && css['fill-v'],
    props.widthByFlex && css['min-width-0'],
    props.className,
  ]
    .filter(Boolean)
    .join(' ');

  return className;
}

export function props2style({
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
  }): React.CSSProperties {
  return Object.entries({
    flexBasis: typeof basis === 'number' && basis !== 0 ? basis : undefined,
    order: order != null ? order : undefined,
    width: typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

    margin: m != null ? toCssValue(m, mSize, unit) : undefined,
    marginTop: mt != null ? toCssValue(mt, mSize, unit) : undefined,
    marginRight: mr != null ? toCssValue(mr, mSize, unit) : undefined,
    marginBottom: mb != null ? toCssValue(mb, mSize, unit) : undefined,
    marginLeft: ml != null ? toCssValue(ml, mSize, unit) : undefined,

    padding: p != null ? toCssValue(p, pSize, unit) : undefined,
    paddingTop: pt != null ? toCssValue(pt, pSize, unit) : undefined,
    paddingRight: pr != null ? toCssValue(pr, pSize, unit) : undefined,
    paddingBottom: pb != null ? toCssValue(pb, pSize, unit) : undefined,
    paddingLeft: pl != null ? toCssValue(pl, pSize, unit) : undefined,
  })
    .filter(([, v]) => v != null)
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
}

export function toCssValue(
  value: boolean | number | DefaultSpaceSize,
  defaultSize: number,
  unit: string
): string {
  if (value === true) return `${defaultSize}${unit}`;
  if (typeof value === 'string') return `${Flex.defaultSizes[value]}${unit}`;
  return `${+value * defaultSize}${unit}`;
}
