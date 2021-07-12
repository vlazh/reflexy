import React, { useMemo } from 'react';
import isHasRef from '../isHasRef';
import sharedDefaults from '../sharedDefaults';
import type { AnyObject, GetComponentProps } from '../types';
import { defaultClassNameTransformer, defaultStyleTransformer } from './utils';
import props2className from './props2className';
import props2style from './props2style';

type Globals = 'inherit' | 'initial' | 'unset';

type FlexPosition = 'center' | 'flex-end' | 'flex-start';

type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly' | 'stretch';

export type JustifyContent = Globals | ContentDistribution | FlexPosition;

export type AlignItems = Globals | FlexPosition | 'baseline' | 'stretch';

export type AlignSelf = AlignItems | 'auto';

export type AlignContent = Globals | ContentDistribution | FlexPosition;

export type FlexBasis = Globals | 'auto' | 'content' | number;

export type FlexWrap = Globals | 'nowrap' | 'wrap' | 'wrap-reverse';

export type Column = number | string | boolean;

export interface FlexProps {
  /** Whether sets `display` to `flex` or not. Default `true`. */
  flex?: boolean;
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

export type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type SpaceUnit =
  | 'px'
  | 'em'
  | 'rem'
  | 'ex'
  | 'ch'
  | '%'
  | 'vw'
  | 'vh'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc'
  | number;

export interface SpaceProps {
  /** Measure unit of space */
  unit?: SpaceUnit;
  /** Size of margin */
  mSize?: SpaceSize | number;
  /** Measure unit of margin */
  mUnit?: SpaceUnit;
  /** margin */
  m?: boolean | number | SpaceSize;
  /** margin-top */
  mt?: boolean | number | SpaceSize;
  /** margin-right */
  mr?: boolean | number | SpaceSize;
  /** margin-bottom */
  mb?: boolean | number | SpaceSize;
  /** margin-left */
  ml?: boolean | number | SpaceSize;
  /** margin by x axis: margin-left & margin-right */
  mx?: boolean | number | SpaceSize;
  /** margin by y axis: margin-top & margin-bottom */
  my?: boolean | number | SpaceSize;
  /** Size of padding */
  pSize?: SpaceSize | number;
  /** Measure unit of padding */
  pUnit?: SpaceUnit;
  /** padding */
  p?: boolean | number | SpaceSize;
  /** padding-top */
  pt?: boolean | number | SpaceSize;
  /** padding-right */
  pr?: boolean | number | SpaceSize;
  /** padding-bottom */
  pb?: boolean | number | SpaceSize;
  /** padding-left */
  pl?: boolean | number | SpaceSize;
  /** padding by x axis: padding-left & padding-right */
  px?: boolean | number | SpaceSize;
  /** padding by y axis: padding-top & padding-bottom */
  py?: boolean | number | SpaceSize;
}

export type Overflow = Globals | 'auto' | 'hidden' | 'scroll' | 'visible';

export interface OverflowProps {
  overflow?: Overflow;
  overflowX?: OverflowProps['overflow'];
  overflowY?: OverflowProps['overflow'];
  /** Shortcut for overflow */
  scrollable?: Extract<Overflow, 'auto' | 'scroll'> | boolean;
  scrollableX?: OverflowProps['scrollable'];
  scrollableY?: OverflowProps['scrollable'];
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

interface StylesOptions {
  defaultStyles?: boolean | { className?: boolean; style?: boolean };
}

export type StylesProps<
  P extends AnyObject,
  O extends StylesOptions = { defaultStyles: false },
  DefaultClassName extends boolean = NonNullable<
    O['defaultStyles'] extends boolean
      ? O['defaultStyles']
      : Exclude<O['defaultStyles'], boolean | undefined>['className']
  >,
  DefaultStyle extends boolean = NonNullable<
    O['defaultStyles'] extends boolean
      ? O['defaultStyles']
      : Exclude<O['defaultStyles'], boolean | undefined>['style']
  >
> = P extends Styleable<infer C, infer S>
  ? Styleable<
      DefaultClassName extends true ? string : C,
      DefaultStyle extends true ? React.CSSProperties : S
    >
  : Styleable<unknown, unknown>;

type PropsWithStyles<P extends AnyObject, O extends StylesOptions> = StylesProps<
  Pick<P, keyof Styleable>,
  O
> &
  Omit<P, keyof Styleable>;

export type GetStylesTransformers<
  StyledProps extends Styleable<unknown, unknown>,
  OriginProps extends AnyObject = StyledProps
> = Transformable<
  StyledProps['className'],
  StyledProps['style'],
  OriginProps['className'],
  OriginProps['style']
>;

type PropsWithStylesTransformers<
  P extends AnyObject,
  O extends StylesOptions,
  Styled = PropsWithStyles<P, O>
> = Styled & GetStylesTransformers<Styled, P>;

interface PropsOptions extends StylesOptions {
  omitProps?: boolean;
}

type FilterComponentProps<P extends AnyObject, O extends PropsOptions> = O['omitProps'] extends true
  ? Pick<P, 'componentRef' | keyof Styleable>
  : P;

export type FlexComponentProps<
  C extends React.ElementType = any,
  O extends PropsOptions = {
    omitProps: false;
    defaultStyles: undefined extends C ? true : false;
  }
> = FlexProps &
  SpaceProps &
  OverflowProps &
  PropsWithStyles<FilterComponentProps<GetComponentProps<C>, O>, O>;

type IfObject<T, P> = T extends never | React.EventHandler<any> | React.Ref<any>
  ? never
  : T extends AnyObject
  ? P
  : never;

type ExcludeObjectType<T extends AnyObject> = Omit<
  T,
  { [P in keyof T]: IfObject<Extract<T[P], AnyObject>, P> }[keyof T]
>;

/** Props without object types only simple types and functions. Useful for memo. @experimental */
export type FlexSimpleProps<
  C extends React.ElementType = any,
  O extends PropsOptions = {
    omitProps: false;
    defaultStyles: undefined extends C ? true : false;
  }
> = ExcludeObjectType<FlexComponentProps<C, O>>;

export type FlexAllProps<
  C extends React.ElementType = any,
  O extends StylesOptions = {
    defaultStyles: undefined extends C ? true : false;
  }
> = FlexProps &
  SpaceProps &
  OverflowProps &
  PropsWithStylesTransformers<GetComponentProps<C>, O> & {
    /**
     * Sets custom react component as a container.
     * Component must accept className and style through props. */
    component?: C;
  };

// Since TS 3.7.3
// Use `div` instead of `React.ElementType<JSX.IntrinsicElements['div']>` to avoid
// `Type instantiation is excessively deep and possibly infinite.` error.
export type DefaultComponentType = 'div';

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>({
  component = 'div' as C,
  flex = true,
  inline,
  row,
  column,
  reverse,
  wrap,
  center,
  alignItems = center ? 'center' : undefined,
  justifyContent = center ? 'center' : undefined,
  alignSelf,
  alignContent,
  basis,
  grow,
  shrink,
  order,

  fill,
  vfill = fill,
  hfill = fill,

  shrinkByContent = true,
  shrinkHeight = shrinkByContent,
  shrinkWidth = shrinkByContent,

  className,
  style,
  classNameTransformer = defaultClassNameTransformer as ClassNameTransformer<typeof className>,
  styleTransformer = defaultStyleTransformer as StyleTransformer<typeof style>,

  unit = sharedDefaults.defaultUnit,
  mSize = sharedDefaults.defaultSize,
  mUnit = unit,
  m,
  mx,
  my,
  mt = my,
  mr = mx,
  mb = my,
  ml = mx,
  pSize = sharedDefaults.defaultSize,
  pUnit = unit,
  p,
  px,
  py,
  pt = py,
  pr = px,
  pb = py,
  pl = px,

  scrollable,
  scrollableX = scrollable,
  scrollableY = scrollable,
  overflow,
  overflowX = overflow,
  overflowY = overflow,

  ...rest
}: FlexAllProps<C>): JSX.Element {
  const calcClassName = useMemo(
    () =>
      props2className({
        flex,
        inline,
        row,
        column,
        reverse,
        wrap,
        alignContent,
        alignItems,
        alignSelf,
        justifyContent,
        basis,
        grow,
        shrink,
        hfill,
        vfill,
        shrinkWidth,
        shrinkHeight,
        overflowX,
        overflowY,
        scrollableX,
        scrollableY,
      }),
    [
      flex,
      inline,
      row,
      column,
      reverse,
      wrap,
      alignContent,
      alignItems,
      alignSelf,
      justifyContent,
      basis,
      grow,
      shrink,
      hfill,
      vfill,
      shrinkWidth,
      shrinkHeight,
      overflowX,
      overflowY,
      scrollableX,
      scrollableY,
    ]
  );

  const { componentRef, children, ...customComponentProps } = rest as React.PropsWithChildren<
    typeof rest & { componentRef?: any }
  >;

  const marginSize = typeof mSize === 'number' ? mSize : sharedDefaults.defaultSizes[mSize];
  const paddingSize = typeof pSize === 'number' ? pSize : sharedDefaults.defaultSizes[pSize];

  const calcStyles = useMemo(
    () =>
      props2style(
        {
          order,
          grow,
          shrink,
          hfill,
          vfill,
          mSize: marginSize,
          mUnit,
          m,
          mb,
          ml,
          mr,
          mt,
          pSize: paddingSize,
          pUnit,
          p,
          pb,
          pl,
          pr,
          pt,
        },
        sharedDefaults.defaultSizes
      ),
    [
      order,
      grow,
      shrink,
      hfill,
      vfill,
      marginSize,
      mUnit,
      m,
      mb,
      ml,
      mr,
      mt,
      paddingSize,
      pUnit,
      p,
      pb,
      pl,
      pr,
      pt,
    ]
  );

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable<any, any>>>,
    {
      ...customComponentProps,
      className: classNameTransformer(calcClassName, className as string),
      style: styleTransformer(calcStyles, style as React.CSSProperties),
      ...(componentRef && (isHasRef(component) ? { ref: componentRef } : { componentRef })),
    },
    children
  );
}

Object.defineProperties(Flex, {
  defaultUnit: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultUnit;
    },
    set(v: SpaceUnit) {
      sharedDefaults.defaultUnit = v;
    },
  },
  defaultSizes: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultSizes;
    },
    set(v: typeof sharedDefaults.defaultSizes) {
      sharedDefaults.defaultSizes = v;
    },
  },
  defaultSize: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultSize;
    },
    set(v: typeof sharedDefaults.defaultSize) {
      sharedDefaults.defaultSize = v;
    },
  },
} as Record<keyof typeof sharedDefaults, PropertyDescriptor>);

export default Flex as typeof Flex & typeof sharedDefaults;
