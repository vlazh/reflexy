import React from 'react';
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

export type Fill = 'v' | 'h' | 'all' | boolean;

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
  /** Sets `justifyContent` and `alignItems` to `center`. Takes a precedence over `justifyContent` and `alignItems`. */
  center?: boolean;
  /** Sets `flex-basis` to corresponding value. */
  basis?: FlexBasis;
  /** Sets `flex-grow` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  grow?: Column;
  /** Sets `flex-shrink` to corresponding value. Also accepts boolean value: `true` equals to `1`, `false` equals to `0`. */
  shrink?: Column;
  /** Sets `order` to corresponding value. */
  order?: number;
  /** Stretch by horizontal. */
  hfill?: boolean;
  /** Stretch by vertical. */
  vfill?: boolean;
  /** Stretch by v - vertical or h - horizontal or all - both. Also accepts boolean value: `true` is equals to `all`. */
  fill?: Fill;
}

export interface Childrenable {
  children?: React.ReactNode;
}

export interface Componentable {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: React.ReactElement<Styleable & Childrenable>;
  /**
   * Ref for container.
   * Used if `component` is undefined */
  componentRef?: React.Ref<HTMLDivElement>;
}

// component: ReactElement
export type CustomComponentProps = Componentable & { componentRef?: undefined };
// component: undefined
export type DivComponentProps = React.HTMLAttributes<HTMLDivElement> &
  Componentable & { component?: undefined };

export type FlexAdditionalProps = CustomComponentProps | DivComponentProps;

export type FlexAllProps = FlexProps & FlexAdditionalProps & Childrenable;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 */
// React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default function Flex(
  props: FlexAllProps
): React.ReactElement<(Styleable & Childrenable) | React.HTMLAttributes<HTMLDivElement>> {
  const nextProps = omitFlexProps(props);
  nextProps.className = props2className(props);
  nextProps.style = props2style(props);

  // render div
  if (!props.component) {
    (nextProps as React.ClassAttributes<HTMLDivElement>).ref = props.componentRef;
    return React.createElement('div', nextProps);
  }

  // render custom component with flex props
  const component = React.Children.only(props.component);
  const componentProps: typeof nextProps = {
    ...nextProps, // copy all data-* attrs and other
    className: classNames(nextProps.className, component.props.className),
    style: { ...component.props.style, ...nextProps.style },
  };
  return React.cloneElement(component, componentProps, component.props.children, props.children);
}

export function omitFlexProps(props: FlexAllProps): Styleable & Childrenable {
  const {
    inline,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    center,
    basis,
    grow,
    shrink,
    row,
    column,
    reverse,
    wrap,
    order,
    hfill,
    vfill,
    fill,
    component,
    componentRef,
    ...rest
  } = props;

  return rest;
}

export function props2className(props: FlexProps): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  // const wrap = props.wrap != null && (props.wrap === false || props.wrap === '' && 'nowrap' ) && `wrap${typeof props.wrap === 'string' ? `-${props.wrap}` : ''}`;
  const wrap = (props.wrap === false && 'nowrap') || (props.wrap === true && 'wrap') || props.wrap;
  const alignItems = props.center ? 'center' : props.alignItems;
  const justifyContent = props.center ? 'center' : props.justifyContent;
  const fill = props.fill === true ? 'all' : props.fill;

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
    props.hfill && css['fill-h'],
    props.vfill && css['fill-v'],
    fill && css[`fill-${fill}`],
    props.className
  );

  return className;
}

export function props2style(props: FlexProps): React.CSSProperties | undefined {
  const { style, order } = props;

  if (!style && !order) {
    return undefined;
  }

  return { ...style, order };
}
