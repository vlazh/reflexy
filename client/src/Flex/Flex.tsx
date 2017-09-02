import * as React from 'react';
import * as classNames from 'classnames';
import { exclude } from './utils';
import * as css from './Flex.css';

// const PREFIX = 'flexbox--';
const PREFIX = '';

export type Align = 'center' | 'flex-start' | 'flex-end';
export type JustifyContent = Align | 'space-between' | 'space-around';
export type AlignItems = Align | 'stretch' | 'baseline';
export type AlignSelf = AlignItems | 'auto';
export type AlignContent = JustifyContent | 'stretch';

export interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  display?: 'flex' | 'inline-flex';
  // flex?: string | number | boolean;
  flexBasis?: 'none' | 'auto' | 'fill' | 'content' | 'fit-content' | 'min-content' | 'max-content';
  /** Shortcut for `display="inline-flex"` */
  inline?: boolean;
  /** Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse` */
  reverse?: boolean;
  /** Sets `flow-direction` to `row`. */
  row?: boolean;
  /** Sets `flow-direction` to `column`. Takes a precedence over `row`. */
  column?: boolean;
  /** Sets `flex-wrap` to `wrap`. */
  wrap?: boolean;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  alignContent?: AlignContent;
  justifyContent?: JustifyContent;
  /** Stretch by horizontal. */
  hfill?: boolean;
  /** Stretch by vertical. */
  vfill?: boolean;
  /** Stretch by v - vertical or h - horizontal or all - both. */
  fill?: 'v' | 'h' | 'all';
  /** Sets React component as a container. */
  component?: React.ComponentType<any>;
  /** Html tag name for output container. Takes a precedence over `component`. */
  tagName?: string;
  className?: string;
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
  const reverse = props.reverse ? '-reverse' : '';
  const display = props.inline ? 'inline-flex' : props.display;
  const column = !!props.column;
  const row = !column && !!props.row;
  // const flexBasis = props.fill ? 'fill' : props.flexBasis;
  const flexBasis = props.flexBasis;

  const className = classNames(
    (display && css[`${PREFIX}display-${display}`]) || css[`${PREFIX}display-flex`],
    props.alignItems && css[`${PREFIX}align-items-${props.alignItems}`],
    props.alignContent && css[`${PREFIX}align-content-${props.alignContent}`],
    props.justifyContent && css[`${PREFIX}justify-content-${props.justifyContent}`],
    props.wrap && css[`${PREFIX}wrap`],
    props.alignSelf && css[`${PREFIX}align-self-${props.alignSelf}`],
    row && css[`${PREFIX}row${reverse}`],
    column && css[`${PREFIX}column${reverse}`],
    // props.flex != null && css[`${PREFIX}flex-${flex}`],
    // props.flexGrow != null && css[`${PREFIX}flex-grow-${flexGrow}`],
    // props.flexShrink != null && css[`${PREFIX}flex-shrink-${flexShrink}`],
    flexBasis && css[`${PREFIX}flex-basis-${flexBasis}`],
    props.hfill && css[`${PREFIX}fill-h`],
    props.vfill && css[`${PREFIX}fill-v`],
    props.fill && css[`${PREFIX}fill-${props.fill}`],
    props.className
  );

  return className;
}
