import React, { useMemo } from 'react';
import { ContentDistribution } from 'csstype';
import classNames from 'classnames';
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

export type ComponentOrElement<CP extends React.PropsWithChildren<Styleable> = any> =
  | React.ElementType<CP>
  | React.ReactElement<CP>;

export type Componentable<C extends ComponentOrElement> = {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: C;
} & (C extends React.ElementType<infer P>
  ? (C extends (React.ComponentClass<any> & React.ClassAttributes<infer T>)
      ? (P & { componentRef?: React.Ref<T> })
      : P)
  : {});
// ? (C extends React.ReactHTMLElement<infer T> ? (P & { componentRef?: React.Ref<T> }) : P)
// : {});
// ? (C extends ({
//     [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
//   }[keyof JSX.IntrinsicElements])
//     ? (React.PropsWithoutRef<P> & { componentRef?: React.Ref<C> })
//     : P)
// : {});

export type FlexAllProps<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
> = React.PropsWithChildren<FlexProps & Componentable<C>>;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
export default function Flex<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
>({
  component = 'div',
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
  ...rest
}: FlexAllProps<C>): JSX.Element {
  const cls = useMemo(
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

  const stl = useMemo(() => props2style({ order, hfill, vfill }), [hfill, order, vfill]);

  // render custom element with flex props
  if (React.isValidElement<React.PropsWithChildren<Styleable>>(component)) {
    const cmp = React.Children.only(component);
    const nextProps: Styleable = {
      className: classNames(cls, cmp.props.className),
      style: style || cmp.props.style ? { ...style, ...stl, ...cmp.props.style } : stl,
    };
    // for elements such as input which not supports children
    if (!cmp.props.children && !children) {
      return React.cloneElement(cmp, nextProps);
    }
    return React.cloneElement(cmp, nextProps, children, cmp.props.children);
  }

  // render component with flex props
  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable>>,
    { ...rest, className: cls, style: style ? { ...style, ...stl } : stl },
    children
  );
}

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

  const className = classNames(
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
    props.className
  );

  return className;
}

export function props2style({
  order,
  hfill,
  vfill,
}: Pick<FlexProps, 'order' | 'hfill' | 'vfill'>): React.CSSProperties | undefined {
  const width =
    hfill != null && typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined;
  const height =
    vfill != null && typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined;

  if (order == null && width == null && height == null) {
    return undefined;
  }

  return { order, width, height };
}
