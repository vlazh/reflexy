import React, { useMemo } from 'react';
import { ContentDistribution } from 'csstype';
import css from './Flex.css';

type Globals = 'inherit' | 'initial' | 'unset';
type FlexPosition = 'center' | 'flex-end' | 'flex-start';

export type JustifyContent = Globals | ContentDistribution | FlexPosition;

export type AlignItems = Globals | FlexPosition | 'baseline' | 'stretch';

export type AlignSelf = AlignItems | 'auto';

export type AlignContent = Globals | ContentDistribution | FlexPosition;

export type FlexBasis = Globals | 'auto' | 'content';

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
}

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

export type ComponentOrElement<CP extends React.PropsWithChildren<Styleable> = any> =
  | React.ElementType<CP>
  | React.ReactElement<CP>;

export type Componentable<C extends ComponentOrElement> = {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: C;
} & (C extends React.ElementType
  ? React.ComponentPropsWithoutRef<C> &
      ('ref' extends keyof React.ComponentPropsWithRef<C>
        ? { componentRef?: React.ComponentPropsWithRef<C>['ref'] }
        : {})
  : {});

export type DefaultComponentType = React.ElementType<JSX.IntrinsicElements['div']>;
const defaultComponent: DefaultComponentType = 'div';

export type FlexAndSpaceProps = FlexProps & SpaceProps;

export type FlexAllProps<
  C extends ComponentOrElement = DefaultComponentType
> = React.PropsWithChildren<FlexAndSpaceProps & Componentable<C>>;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends ComponentOrElement = DefaultComponentType>({
  component = defaultComponent as C,
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
        m,
        mSize: marginSize,
        mb,
        ml,
        mr,
        mt,
        p,
        pSize: paddingSize,
        pb,
        pl,
        pr,
        pt,
        unit,
      }),
    [hfill, order, vfill, m, marginSize, mb, ml, mr, mt, p, paddingSize, pb, pl, pr, pt, unit]
  );

  // Render custom element with flex props
  if (React.isValidElement<React.PropsWithChildren<Styleable>>(component)) {
    const cmp = React.Children.only(component);
    const nextProps: Styleable = {
      className: `${calcClassName}${cmp.props.className ? ` ${cmp.props.className}` : ''}`,
      style:
        style || cmp.props.style ? { ...style, ...calcStyles, ...cmp.props.style } : calcStyles,
    };
    // for elements such as input which not supports children
    if (!cmp.props.children && !children) {
      return React.cloneElement(cmp, nextProps);
    }
    return React.cloneElement(cmp, nextProps, children, cmp.props.children);
  }

  // Render component with flex props

  const { componentRef, ...propsWithoutRef } = rest as (typeof rest & { componentRef?: any });

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable>>,
    {
      ...propsWithoutRef,
      className: calcClassName,
      style: style ? { ...style, ...calcStyles } : calcStyles,
      ref: componentRef,
    },
    children
  );
}

/** Default measure of space */
Flex.defaultUnit = 'rem';

/** Predefined default space sizes */
Flex.defaultSizes = {
  /* small size */
  s: 0.5,
  /** medium size */
  m: 1,
  /** large size */
  l: 2,
} as Record<DefaultSpaceSize, number>;

Flex.S = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C> & React.Attributes) => <Flex mSize="s" pSize="s" {...rest} />;

Flex.M = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C> & React.Attributes) => <Flex mSize="m" pSize="m" {...rest} />;

Flex.L = <C extends ComponentOrElement = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C> & React.Attributes) => <Flex mSize="l" pSize="l" {...rest} />;

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
  >
): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  // const wrap = props.wrap != null && (props.wrap === false || props.wrap === '' && 'nowrap' ) && `wrap${typeof props.wrap === 'string' ? `-${props.wrap}` : ''}`;
  const wrap = (props.wrap === false && 'nowrap') || (props.wrap === true && 'wrap') || props.wrap;
  const alignItems = props.alignItems || (props.center && 'center');
  const justifyContent = props.justifyContent || (props.center && 'center');
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
    props.basis && css[`flex-basis--${props.basis}`],
    grow && css[`flex-grow--${grow}`],
    shrink && css[`flex-shrink--${shrink}`],
    hfill && css['fill-h'],
    vfill && css['fill-v'],
    props.className,
  ]
    .filter(Boolean)
    .join(' ');

  return className;
}

export function props2style({
  order,
  hfill,
  vfill,

  m,
  mSize,
  mb,
  ml,
  mr,
  mt,
  p,
  pSize,
  pb,
  pl,
  pr,
  pt,
  unit,
}: FlexProps &
  Omit<SpaceProps, 'mSize' | 'pSize' | 'unit'> & {
    mSize: number;
    pSize: number;
    unit: string;
  }): React.CSSProperties {
  return Object.entries({
    order: order != null ? order : undefined,
    width: hfill != null && typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined,
    height: vfill != null && typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined,

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
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
}

export function toCssValue(value: boolean | number, size: number, unit: string): string {
  return value === true ? `${size}${unit}` : `${+value * size}${unit}`;
}
