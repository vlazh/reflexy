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

export interface Childrenable {
  children?: React.ReactNode;
}

export interface Componentable {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: React.ReactElement<Styleable & Childrenable>;
}

export type FlexAllProps = FlexProps & Componentable & Childrenable;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 */
export default function Flex(props: FlexAllProps): JSX.Element {
  const nextProps: Styleable & Childrenable = {
    className: props2className(props),
    style: props2style(props),
    children: props.children,
  };

  // render div with flex props
  if (!props.component) {
    return React.createElement('div', nextProps);
  }

  // render custom component with flex props
  const component = React.Children.only(props.component);
  const componentProps: typeof nextProps = {
    ...nextProps,
    className: classNames(nextProps.className, component.props.className),
    style: { ...component.props.style, ...nextProps.style },
  };
  // for elements such as input which not supports children
  if (!component.props.children && !props.children) {
    return React.cloneElement(component, componentProps);
  }
  return React.cloneElement(component, componentProps, component.props.children, props.children);
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
  style,
  order,
  hfill,
  vfill,
}: FlexProps): React.CSSProperties | undefined {
  const width =
    hfill != null && typeof hfill === 'number' ? `${Math.min(hfill, 1) * 100}%` : undefined;
  const height =
    vfill != null && typeof vfill === 'number' ? `${Math.min(vfill, 1) * 100}%` : undefined;

  if (order == null && width == null && height == null) {
    return style;
  }

  return { ...style, order, width, height };
}
