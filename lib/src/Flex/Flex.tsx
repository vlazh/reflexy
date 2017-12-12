import * as React from 'react';
import * as classNames from 'classnames';
import { exclude } from './utils';
import * as css from './Flex.css';

const PREFIX = 'reflexy__';

export type Align = 'initial' | 'inherit' | 'center' | 'flex-start' | 'flex-end';
export type JustifyContent = Align | 'space-between' | 'space-around';
export type AlignItems = Align | 'stretch' | 'baseline';
export type AlignSelf = AlignItems | 'auto';
export type AlignContent = JustifyContent | 'stretch';
export type FlexBasis =
  | 'none'
  | 'auto'
  | 'fill'
  | 'content'
  | 'fit-content'
  | 'min-content'
  | 'max-content';
export type Fill = 'v' | 'h' | 'all' | boolean;
/* prettier-ignore */
export type NumColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17  | 18 | 19 | 20 | 21 | 22 | 23 | 24;
/* prettier-ignore */
export type NumStrColumn = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17 ' | '18' | '19' | '20' | '21' | '22' | '23' | '24';
export type Column = NumColumn | NumStrColumn | boolean;

export interface FlexProps {
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
  /** Sets `flex-basis` to corresponding value. */
  basis?: FlexBasis;
  /** @deprecated Use `basis` instead. */
  flexBasis?: FlexBasis;
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
  /** Sets React component as a container. Component must accept className through props. */
  component?: React.ComponentType<any>;
  /** Html tag name for output container. Takes a precedence over `component`. */
  tagName?: string;
  /** Sets `justifyContent` and `alignItems` to `center`. Takes a precedence over `justifyContent` and `alignItems`. */
  center?: boolean;
  /** CSS class name. */
  className?: string;
  /** For accepts `component` props. */
  [key: string]: any;
}

export type DivTagProps = React.HTMLAttributes<HTMLDivElement>;

export type UserTagProps = React.HTMLAttributes<Element> & { tagName: string };

export type Props = (DivTagProps | UserTagProps) & FlexProps;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 */
export default function Flex(props: Props) {
  const restProps = exclude(props);
  restProps.className = props2className(props);
  restProps.style = props2style(props);

  if (props.tagName) {
    return React.createElement(props.tagName, restProps);
  }

  return props.component ? <props.component {...restProps} /> : <div {...restProps} />;
}

function props2className(props: FlexProps): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const basis = props.basis || props.flexBasis;
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  const wrap = props.wrap && `wrap` + (typeof props.wrap === 'string' ? `-${props.wrap}` : '');
  const fill = props.fill === true ? 'all' : props.fill;
  const alignItems = props.center ? 'center' : props.alignItems;
  const justifyContent = props.center ? 'center' : props.justifyContent;

  const className = classNames(
    props.inline ? css[`${PREFIX}display-inline-flex`] : css[`${PREFIX}display-flex`],
    props.alignContent && css[`${PREFIX}align-content-${props.alignContent}`],
    alignItems && css[`${PREFIX}align-items-${alignItems}`],
    props.alignSelf && css[`${PREFIX}align-self-${props.alignSelf}`],
    justifyContent && css[`${PREFIX}justify-content-${justifyContent}`],
    basis && css[`${PREFIX}flex-basis-${basis}`],
    grow && css[`${PREFIX}flex-grow-${grow}`],
    shrink && css[`${PREFIX}flex-shrink-${shrink}`],
    row && css[`${PREFIX}row${reverse}`],
    column && css[`${PREFIX}column${reverse}`],
    wrap && css[`${PREFIX}${wrap}`],
    props.hfill && css[`${PREFIX}fill-h`],
    props.vfill && css[`${PREFIX}fill-v`],
    fill && css[`${PREFIX}fill-${fill}`],
    props.className
  );

  return className;
}

function props2style(props: FlexProps): React.CSSProperties | void {
  return props.order ? { order: props.order } : undefined;
}
