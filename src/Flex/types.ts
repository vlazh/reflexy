import type { Globals as Globals0, Property, DataType } from 'csstype';
import type { ComponentProps, GetComponentProps } from '../types';

type Globals = ExtractStrict<Globals0, 'inherit' | 'initial' | 'unset'>;

type ContentPosition = ExtractStrict<
  DataType.ContentPosition,
  'center' | 'flex-end' | 'flex-start'
>;

type JustifyContent = ExtractStrict<
  Property.JustifyContent,
  Globals | DataType.ContentDistribution | ContentPosition
>;

type AlignItems = ExtractStrict<
  Property.AlignItems,
  Globals | ContentPosition | 'baseline' | 'stretch'
>;

type AlignSelf = ExtractStrict<Property.AlignSelf, AlignItems | 'auto'>;

type AlignContent = ExtractStrict<
  Property.AlignContent,
  Globals | DataType.ContentDistribution | ContentPosition
>;

type FlexBasis = ExtractStrict<
  Property.FlexBasis,
  Globals | 'auto' | 'content' | 'fit-content' | 'max-content' | 'min-content' | 0
>;

type FlexWrap = ExtractStrict<Property.FlexWrap, Globals | 'nowrap' | 'wrap' | 'wrap-reverse'>;

type Display = ExtractStrict<
  Property.Display,
  'initial' | 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'none'
>;

type Column = number | string | boolean;

export interface FlexProps {
  /** Defaults to `flex`. */
  display?: Display | undefined;
  /** @deprecated Use `display` instead. `display` takes priority. */
  flex?: boolean | undefined;
  /** @deprecated Use `display` instead. `display` takes priority. Sets `display` to `inline-flex`. */
  inline?: boolean | undefined;
  /** Sets `flow-direction` to `row`. */
  row?: boolean | undefined;
  /** Sets `flow-direction` to `column`. Takes a precedence over `row`. */
  column?: boolean | undefined;
  /** Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`. */
  reverse?: boolean | undefined;
  /** Sets `flex-wrap` to corresponding value. Also accepts boolean value: `true` equals to `wrap`, `false` equals to `nowrap`. */
  wrap?: FlexWrap | boolean | undefined;
  /** Sets `align-content` to corresponding value. */
  alignContent?: AlignContent | undefined;
  /** Sets `align-items` to corresponding value. */
  alignItems?: AlignItems | undefined;
  /** Sets `align-self` to corresponding value. */
  alignSelf?: AlignSelf | undefined;
  /** Sets `justify-content` to corresponding value. */
  justifyContent?: JustifyContent | undefined;
  /** Sets `justifyContent` and `alignItems` to `center`. `justifyContent` and `alignItems` take a precedence over `center`. */
  center?: boolean | undefined;
  /** Sets `flex-basis` to corresponding value. */
  basis?: FlexBasis | undefined;
  /** Sets `flex-grow` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  grow?: Column | undefined;
  /** Sets `flex-shrink` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  shrink?: Column | undefined;
  /** Sets `order` to corresponding value. */
  order?: number | undefined;
  /** Stretch by horizontal or sets width in percentage (numbers in range 0.0 to 1.0 inclusive). */
  hfill?: boolean | number | undefined;
  /** Stretch by vertical or sets height in percentage (numbers in range 0.0 to 1.0 inclusive). */
  vfill?: boolean | number | undefined;
  /** Stretch by vertical and horizontal. */
  fill?: boolean | undefined;
  /**
   * Sets `min-width: 0` and `min-height: 0`.
   * By default, a flex item cannot be smaller than the size of its content.
   * The initial setting on flex items is `min-width: auto` and `min-height: auto`.
   * One way to enable flex items to shrink past their content is to set a flex item to `min-width: 0` or `min-height: 0`. */
  shrinkByContent?: boolean | undefined;
  /** Sets `min-width` to `0`. Takes a precedence over `shrinkByContent`. */
  shrinkWidth?: boolean | undefined;
  /** Sets `min-height` to `0`. Takes a precedence over `shrinkByContent`. */
  shrinkHeight?: boolean | undefined;
}

export type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
/** Signed `SpaceSize`. */
export type SSpaceSize = `-${SpaceSize}`;
/** Unsigned space. */
export type USpace = number | SpaceSize;
/** Unsigned and signed space. */
export type Space = USpace | SSpaceSize;

/** `number` is treated as number of pixels (px). */
export type SpaceUnit =
  | 'px'
  | 'em'
  | 'rem'
  | 'ex'
  | 'ch'
  // | '%'
  // | 'vw'
  // | 'vh'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc'
  | number;

export type Gap = USpace | `${USpace} ${USpace}`;

export interface SpaceProps {
  /** Measure unit of space */
  unit?: SpaceUnit | undefined;
  /** Size of margin */
  mSize?: Space | undefined;
  /** Measure unit of margin */
  mUnit?: SpaceUnit | undefined;
  /** margin */
  m?: boolean | Space | undefined;
  /** margin-top */
  mt?: boolean | Space | undefined;
  /** margin-right */
  mr?: boolean | Space | undefined;
  /** margin-bottom */
  mb?: boolean | Space | undefined;
  /** margin-left */
  ml?: boolean | Space | undefined;
  /** margin by x axis: margin-left & margin-right */
  mx?: boolean | Space | undefined;
  /** margin by y axis: margin-top & margin-bottom */
  my?: boolean | Space | undefined;
  /** Size of padding */
  pSize?: Space | undefined;
  /** Measure unit of padding */
  pUnit?: SpaceUnit | undefined;
  /** padding */
  p?: boolean | Space | undefined;
  /** padding-top */
  pt?: boolean | Space | undefined;
  /** padding-right */
  pr?: boolean | Space | undefined;
  /** padding-bottom */
  pb?: boolean | Space | undefined;
  /** padding-left */
  pl?: boolean | Space | undefined;
  /** padding by x axis: padding-left & padding-right */
  px?: boolean | Space | undefined;
  /** padding by y axis: padding-top & padding-bottom */
  py?: boolean | Space | undefined;
  /** Size of gap */
  gapSize?: USpace | undefined;
  /** Measure unit of gap */
  gapUnit?: SpaceUnit | undefined;
  /* gap */
  gap?: boolean | Gap | undefined;
  /* column-gap */
  columnGap?: boolean | USpace | undefined;
  /* row-gap */
  rowGap?: boolean | USpace | undefined;
}

export type Overflow = Globals | 'auto' | 'hidden' | 'scroll' | 'visible';

export interface OverflowProps {
  overflow?: Overflow | undefined;
  overflowX?: OverflowProps['overflow'] | undefined;
  overflowY?: OverflowProps['overflow'] | undefined;
  /** Shortcut for overflow */
  scrollable?: Extract<Overflow, 'auto' | 'scroll'> | boolean | undefined;
  scrollableX?: OverflowProps['scrollable'] | undefined;
  scrollableY?: OverflowProps['scrollable'] | undefined;
}

export type FlexOnlyProps = FlexProps & SpaceProps & OverflowProps;

export interface Styleable<C = string, S = React.CSSProperties> {
  className?: C | undefined;
  style?: S | undefined;
}

export type ClassNameTransformer<T, R = T> = (
  calcClassName: string,
  userClassName?: T
) => NonNullable<R>;

export type StyleTransformer<T, R = T> = (calcStyle?: React.CSSProperties, userStyle?: T) => R;

interface StylesOptions {
  inferStyleProps?:
    | boolean
    | { className?: boolean | undefined; style?: boolean | undefined }
    | undefined;
}

export type StylesProps<
  P extends AnyObject,
  O extends StylesOptions = { inferStyleProps: true },
  InferClassName extends boolean = O['inferStyleProps'] extends boolean
    ? O['inferStyleProps']
    : NonNullable<Exclude<O['inferStyleProps'], boolean | undefined>['className']>,
  InferStyle extends boolean = O['inferStyleProps'] extends boolean
    ? O['inferStyleProps']
    : NonNullable<Exclude<O['inferStyleProps'], boolean | undefined>['style']>,
> =
  P extends Styleable<infer C, infer S>
    ? Styleable<
        InferClassName extends true ? C : string,
        InferStyle extends true ? S : React.CSSProperties
      >
    : Styleable<
        InferClassName extends true ? unknown : string,
        InferStyle extends true ? unknown : React.CSSProperties
      >;

type PropsWithStyles<P extends AnyObject, O extends StylesOptions> = StylesProps<
  // Pick keys in order to avoid `className: unknown` with `FlexAllProps<C>` in components.
  // Pick<P, Extract<keyof P, keyof Styleable>>,
  P,
  O
> &
  Omit<P, keyof Styleable>;

export type GetStylesTransformers<
  StyledProps extends Styleable<unknown, unknown>,
  OriginProps extends AnyObject = StyledProps,
  Strict extends boolean = false,
> = Strict extends true
  ? ([StyledProps['className'], OriginProps['className']] extends [
      string | undefined,
      string | undefined,
    ]
      ? {} // eslint-disable-line @typescript-eslint/no-empty-object-type
      : {
          classNameTransformer?:
            | ClassNameTransformer<StyledProps['className'], OriginProps['className']>
            | undefined;
        }) &
      ([StyledProps['style'], OriginProps['style']] extends [
        React.CSSProperties | undefined,
        React.CSSProperties | undefined,
      ]
        ? {} // eslint-disable-line @typescript-eslint/no-empty-object-type
        : {
            styleTransformer?:
              | StyleTransformer<StyledProps['style'], OriginProps['style']>
              | undefined;
          })
  : {
      classNameTransformer?:
        | ClassNameTransformer<StyledProps['className'], OriginProps['className']>
        | undefined;
      styleTransformer?: StyleTransformer<StyledProps['style'], OriginProps['style']> | undefined;
    };

type PropsWithStylesTransformers<
  P extends AnyObject,
  O extends StylesOptions,
  Styled extends Styleable<unknown, unknown> = PropsWithStyles<P, O>,
> = Styled & GetStylesTransformers<Styled, P, true>;

interface PropsOptions extends StylesOptions {
  omitProps?: boolean | undefined;
}

/** All props or `ref`, `style`, `className`. */
type FilterComponentProps<P extends AnyObject, O extends PropsOptions> = O['omitProps'] extends true
  ? Pick<P, Extract<keyof P, 'ref' | keyof Styleable>>
  : P;

export type FlexComponentProps<
  C extends React.ElementType = any,
  O extends PropsOptions = { omitProps: false; inferStyleProps: false },
> = FlexOnlyProps & PropsWithStyles<FilterComponentProps<ComponentProps<C>, O>, O>;

// type IfObject<T, P> = T extends never
//   ? never
//   : T extends React.EventHandler<any> | React.Ref<any>
//     ? never
//     : T extends AnyObject
//       ? P
//       : never;

// type ExcludeObjectType<T extends AnyObject> = Omit<
//   T,
//   { [P in keyof T]: IfObject<Extract<T[P], AnyObject>, P> }[keyof T]
// >;

// /** Props without object types only simple types and functions. Useful for memo. @experimental */
// export type FlexSimpleProps<
//   C extends React.ElementType = any,
//   O extends PropsOptions = { omitProps: false; inferStyleProps: false },
// > = ExcludeObjectType<FlexComponentProps<C, O>>;

export type FlexAllProps<
  C extends React.ElementType = any,
  O extends StylesOptions = {
    // inferStyleProps: undefined extends C ? false : React.ComponentType extends C ? false : true;
    inferStyleProps: false;
  },
> = FlexOnlyProps &
  PropsWithStylesTransformers<GetComponentProps<C>, O> & {
    /**
     * Sets custom react component as a container.
     * Component must accept className and style through props. */
    component?: C | undefined;
  };

// Since TS 3.7.3
// Use `div` instead of `React.ElementType<JSX.IntrinsicElements['div']>` to avoid
// `Type instantiation is excessively deep and possibly infinite.` error.
export type DefaultComponentType = 'div';
