import * as React from 'react';
import * as classNames from 'classnames';
import { exclude } from './utils';
import * as css from './Flex.css';

const PREFIX = 'reflexy__';

export type Align = 'center' | 'flex-start' | 'flex-end';
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
export type Fill = 'v' | 'h' | 'all';

export interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Sets `display` to `inline-flex` */
  inline?: boolean;
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  justifyContent?: JustifyContent;
  flexBasis?: FlexBasis;
  /** Sets `flow-direction` to `row`. */
  row?: boolean;
  /** Sets `flow-direction` to `column`. Takes a precedence over `row`. */
  column?: boolean;
  /** Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse` */
  reverse?: boolean;
  /** Sets `flex-wrap` to `wrap`. */
  wrap?: boolean;
  /** Stretch by horizontal. */
  hfill?: boolean;
  /** Stretch by vertical. */
  vfill?: boolean;
  /** Stretch by v - vertical or h - horizontal or all - both. */
  fill?: Fill;
  /** Sets React component as a container. */
  component?: React.ComponentType<any>;
  /** Html tag name for output container. Takes a precedence over `component`. */
  tagName?: string;
}

export default function Flex(props: Props) {
  const restProps = exclude(props);
  restProps.className = props2className(props);

  if (props.tagName) {
    return React.createElement(props.tagName, restProps);
  }

  return props.component ? <props.component {...restProps} /> : <div {...restProps} />;
}

function props2className(props: Props): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';

  const className = classNames(
    props.inline ? css[`${PREFIX}display-inline-flex`] : css[`${PREFIX}display-flex`],
    props.alignContent && css[`${PREFIX}align-content-${props.alignContent}`],
    props.alignItems && css[`${PREFIX}align-items-${props.alignItems}`],
    props.alignSelf && css[`${PREFIX}align-self-${props.alignSelf}`],
    props.justifyContent && css[`${PREFIX}justify-content-${props.justifyContent}`],
    props.flexBasis && css[`${PREFIX}flex-basis-${props.flexBasis}`],
    row && css[`${PREFIX}row${reverse}`],
    column && css[`${PREFIX}column${reverse}`],
    props.wrap && css[`${PREFIX}wrap`],
    props.hfill && css[`${PREFIX}fill-h`],
    props.vfill && css[`${PREFIX}fill-v`],
    props.fill && css[`${PREFIX}fill-${props.fill}`],
    props.className
  );

  return className;
}
