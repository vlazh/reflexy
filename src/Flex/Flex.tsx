import React, { useMemo } from 'react';
import type { ContentDistribution } from 'csstype';
import { defaultClassNameTransformer, defaultStyleTransformer } from './utils';
import props2className from './props2className';
import props2style from './props2style';

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

export interface FlexProps {
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
   * Sets `min-width: 0` and `min-height: 0`.
   * By default, a flex item cannot be smaller than the size of its content.
   * The initial setting on flex items is `min-width: auto` and `min-height: auto`.
   * One way to enable flex items to shrink past their content is to set a flex item to `min-width: 0` or `min-height: 0`. */
  shrinkByContent?: boolean;
  /** Sets `min-width` to `0`. Takes a precedence over `shrinkByContent`. */
  shrinkWidth?: boolean;
  /** Sets `min-height` to `0`. Takes a precedence over `shrinkByContent`. */
  shrinkHeight?: boolean;
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

export type Overflow = Globals | 'auto' | 'hidden' | 'scroll' | 'visible';

export interface OverflowProps {
  overflow?: Overflow;
  overflowX?: this['overflow'];
  overflowY?: this['overflow'];
  /** Shortcut for overflow */
  scrollable?: Extract<Overflow, 'auto' | 'scroll'> | boolean;
  scrollableX?: this['scrollable'];
  scrollableY?: this['scrollable'];
}

export interface Styleable<C = string, S = React.CSSProperties> {
  className?: C;
  style?: S;
}

export type ClassNameTransformer<T, R = T> = (
  calcClassName: string,
  userClassName?: T
) => NonNullable<R>;
export type StyleTransformer<T, R = T> = (calcStyle?: React.CSSProperties, userStyle?: T) => R;

export interface Transformable<C = string, S = React.CSSProperties, CR = C, SR = S> {
  classNameTransformer?: ClassNameTransformer<C, CR>;
  styleTransformer?: StyleTransformer<S, SR>;
}

export type StylesProps<
  P extends {},
  DefaultStyles extends boolean = false
> = DefaultStyles extends true
  ? Styleable
  : P extends Styleable<infer C, infer S>
  ? Styleable<C, S>
  : Styleable<unknown, unknown>;

export type StylesTransformersProps<
  P extends { [P: string]: any },
  DefaultStyles extends boolean = false
> = DefaultStyles extends true
  ? Transformable<string, React.CSSProperties, P['className'], P['style']>
  : Transformable<P['className'], P['style']>;

type PropsWithComponentRef<P extends {}> = React.PropsWithoutRef<P> &
  (P extends { ref?: any } ? { componentRef?: P['ref'] } : {});

// Since TS 3.7.3
// Use `Omit` (as copy of object type) to make TweakableComponentProps as object
// and to avoid `Rest types may only be created from object types.ts(2700)` error in Flex.S and others
export type TweakableComponentProps<C extends React.ElementType> = Omit<
  {
    /**
     * Sets custom react component as a container.
     * Component must accept className and style through props. */
    component?: C;
  } & (undefined extends C ? unknown : PropsWithComponentRef<React.ComponentPropsWithRef<C>>),
  never
>;

// Since TS 3.7.3
// Use `div` instead of `React.ElementType<JSX.IntrinsicElements['div']>` to avoid
// `Type instantiation is excessively deep and possibly infinite.` error.
export type DefaultComponentType = 'div';

type PropsWithStyles<P extends {}, DefaultStyles extends boolean> = P &
  StylesProps<P, DefaultStyles>;

type PropsWithStylesTransformers<P extends {}, DefaultStyles extends boolean> = PropsWithStyles<
  P,
  DefaultStyles
> &
  StylesTransformersProps<P, DefaultStyles>;

export type FlexComponentProps<
  C extends React.ElementType = any,
  DefaultStyles extends boolean = undefined extends C ? true : false
> = FlexProps &
  SpaceProps &
  OverflowProps &
  PropsWithStyles<Omit<TweakableComponentProps<C>, 'component'>, DefaultStyles>;

export type FlexAllProps<
  C extends React.ElementType = any,
  DefaultStyles extends boolean = undefined extends C ? true : false
> = FlexProps &
  SpaceProps &
  OverflowProps &
  PropsWithStylesTransformers<TweakableComponentProps<C>, DefaultStyles>;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>({
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
  shrinkByContent = true,
  shrinkWidth,
  shrinkHeight,
  className,
  style,
  classNameTransformer = defaultClassNameTransformer as any,
  styleTransformer = defaultStyleTransformer as any,

  mSize = 'm',
  m,
  mx,
  my,
  pSize = 'm',
  p,
  px,
  py,
  unit = Flex.defaultUnit,

  overflow,
  overflowX,
  overflowY,
  scrollable,
  scrollableX,
  scrollableY,

  ...rest
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
        shrinkByContent,
        shrinkWidth,
        shrinkHeight,
        overflow,
        overflowX,
        overflowY,
        scrollable,
        scrollableX,
        scrollableY,
      }),
    [
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
      shrinkByContent,
      shrinkWidth,
      shrinkHeight,
      overflow,
      overflowX,
      overflowY,
      scrollable,
      scrollableX,
      scrollableY,
    ]
  );

  const {
    mt = my,
    mr = mx,
    mb = my,
    ml = mx,
    pt = py,
    pr = px,
    pb = py,
    pl = px,
    componentRef,
    children,
    ...customComponentProps
  } = rest as React.PropsWithChildren<typeof rest & { componentRef?: any }>;

  const marginSize = useMemo(() => (typeof mSize === 'number' ? mSize : Flex.defaultSizes[mSize]), [
    mSize,
  ]);
  const paddingSize = useMemo(
    () => (typeof pSize === 'number' ? pSize : Flex.defaultSizes[pSize]),
    [pSize]
  );

  const calcStyles = useMemo(
    () =>
      props2style(
        {
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
        },
        Flex.defaultSizes
      ),
    [hfill, m, marginSize, mb, ml, mr, mt, order, p, paddingSize, pb, pl, pr, pt, unit, vfill]
  );

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable<any, any>>>,
    {
      ...customComponentProps,
      className: (classNameTransformer as ClassNameTransformer<typeof className>)(
        calcClassName,
        className
      ),
      style: (styleTransformer as StyleTransformer<typeof style>)(calcStyles, style),
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

export default Flex;
