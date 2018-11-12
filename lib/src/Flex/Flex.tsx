import React from 'react';
import { Globals, ContentDistribution, ContentPosition, SelfPosition } from 'csstype';
import classNames from 'classnames';
import './Flex.css';

const PREFIX = 'reflexy__';

export type Align = Globals | ContentDistribution | ContentPosition;
export type JustifyContent = Align | 'left' | 'normal' | 'right';
export type AlignItems = Globals | SelfPosition | 'baseline' | 'normal' | 'stretch';
export type AlignSelf = AlignItems | 'auto';
export type AlignContent = Align | 'baseline' | 'normal';
export type FlexBasis =
  | Globals
  | '-webkit-auto'
  | 'auto'
  | 'available'
  | 'content'
  | 'fit-content'
  | 'max-content'
  | 'min-content'
  | number;
export type Fill = 'v' | 'h' | 'all' | boolean;
// prettier-ignore
export type ColumnID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17  | 18 | 19 | 20 | 21 | 22 | 23 | 24;
// prettier-ignore
export type ColumnStringID = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17 ' | '18' | '19' | '20' | '21' | '22' | '23' | '24';
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
  /** Sets `flex-grow` to corresponding value. Also accepts boolean value: `true` is equals to `1`, `false` is equals to `0`. */
  grow?: Column;
  /** Sets `flex-shrink` to corresponding value. Also accepts boolean value: `true` is equals to `1`, `false` is equals to `0`. */
  shrink?: Column;
  /** Sets `flow-direction` to `row`. */
  row?: boolean;
  /** Sets `flow-direction` to `column`. Takes a precedence over `row`. */
  column?: boolean;
  /** Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`. */
  reverse?: boolean;
  /** Sets `flex-wrap` to `wrap` or `wrap-reverse`. */
  wrap?: boolean | 'reverse';
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
   * Component must accept className and style through props.
   */
  component?: React.ReactElement<P & Styleable>;
  /** Used if `component` is undefined */
  componentRef?: React.Ref<HTMLDivElement>;
}

export interface Childrenable {
  children?: React.ReactNode;
}

export type AdditionalProps<P> = undefined extends P
  ? Componentable<P> & { componentRef?: undefined } // component: ReactElement
  : React.HTMLAttributes<HTMLDivElement> & Componentable<P> & { component?: undefined }; // component: undefined

export type AllProps<P> = FlexProps & AdditionalProps<P> & Childrenable;

type Omit<A extends object, K extends string | number | symbol> = Pick<A, Exclude<keyof A, K>>;

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
    restProps.ref = (props as AllProps<{}>).componentRef;
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
  return React.cloneElement<P & Styleable>(
    component,
    componentProps as P & Styleable,
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
  } = props as any;

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
  const wrap = props.wrap && `wrap${typeof props.wrap === 'string' ? `-${props.wrap}` : ''}`;
  const fill = props.fill === true ? 'all' : props.fill;
  const alignItems = props.center ? 'center' : props.alignItems;
  const justifyContent = props.center ? 'center' : props.justifyContent;

  const className = classNames(
    props.inline ? `${PREFIX}display-inline-flex` : `${PREFIX}display-flex`,
    props.alignContent && `${PREFIX}align-content-${props.alignContent}`,
    alignItems && `${PREFIX}align-items-${alignItems}`,
    props.alignSelf && `${PREFIX}align-self-${props.alignSelf}`,
    justifyContent && `${PREFIX}justify-content-${justifyContent}`,
    props.basis && `${PREFIX}flex-basis-${props.basis}`,
    grow && `${PREFIX}flex-grow-${grow}`,
    shrink && `${PREFIX}flex-shrink-${shrink}`,
    row && `${PREFIX}row${reverse}`,
    column && `${PREFIX}column${reverse}`,
    wrap && `${PREFIX}${wrap}`,
    props.hfill && `${PREFIX}fill-h`,
    props.vfill && `${PREFIX}fill-v`,
    fill && `${PREFIX}fill-${fill}`,
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
