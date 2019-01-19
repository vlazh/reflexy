import React from 'react';
import { ContentDistribution } from 'csstype';
import classNames from 'classnames';
import { Omit } from '@vzh/ts-types';
import './Flex.css';

const CSS_PREFIX = 'reflexy__';

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

export interface Componentable<P> {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: React.ReactElement<P & Styleable>;
  /**
   * Ref for container.
   * Used if `component` is undefined */
  componentRef?: React.Ref<HTMLDivElement>;
}

export interface Childrenable {
  children?: React.ReactNode;
}

export type AdditionalProps<P> = undefined extends P
  ? Componentable<P> & { componentRef?: undefined } // component: ReactElement
  : React.HTMLAttributes<HTMLDivElement> & Componentable<P> & { component?: undefined }; // component: undefined

export type AllProps<P> = FlexProps & AdditionalProps<P> & Childrenable;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component={<button />} ... />`
 */
export default function Flex<P = {}>(props: AllProps<P>) {
  const restProps: ReturnType<typeof omitFlexProps> &
    Styleable &
    React.ClassAttributes<any> = omitFlexProps(props);
  restProps.className = props2className(props);
  restProps.style = props2style(props);

  // render div
  if (!props.component) {
    restProps.ref = props.componentRef;
    return React.createElement<React.HTMLAttributes<HTMLDivElement>>('div', restProps);
  }

  // render custom component with flex props
  const component: React.ReactElement<P & Styleable & Childrenable> = React.Children.only(
    props.component
  );
  const componentProps: typeof restProps = {
    ...restProps, // copy all data-* attrs and other
    className: classNames(restProps.className, component.props.className),
    style: { ...component.props.style, ...restProps.style },
  };
  return React.cloneElement<any>(
    component,
    componentProps,
    component.props.children,
    props.children
  );
}

export function omitFlexProps<P>(
  props: AllProps<P>
): Omit<AllProps<P>, keyof FlexProps | keyof Componentable<P>> {
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
    className,
    style,
    component,
    componentRef,
    ...rest
  } = props;

  return rest as Omit<AllProps<P>, keyof FlexProps | keyof Componentable<P>>;
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
    `${CSS_PREFIX}display--${props.inline ? 'inline-flex' : 'flex'}`,
    row && `${CSS_PREFIX}row${reverse}`,
    column && `${CSS_PREFIX}column${reverse}`,
    wrap && `${CSS_PREFIX}wrap--${wrap}`,
    alignItems && `${CSS_PREFIX}align-items--${alignItems}`,
    props.alignContent && `${CSS_PREFIX}align-content--${props.alignContent}`,
    props.alignSelf && `${CSS_PREFIX}align-self--${props.alignSelf}`,
    justifyContent && `${CSS_PREFIX}justify-content--${justifyContent}`,
    props.basis && `${CSS_PREFIX}flex-basis--${props.basis}`,
    grow && `${CSS_PREFIX}flex-grow--${grow}`,
    shrink && `${CSS_PREFIX}flex-shrink--${shrink}`,
    props.hfill && `${CSS_PREFIX}fill-h`,
    props.vfill && `${CSS_PREFIX}fill-v`,
    fill && `${CSS_PREFIX}fill-${fill}`,
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
