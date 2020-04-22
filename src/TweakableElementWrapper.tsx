import React from 'react';
import type { Styleable } from './Flex';

export interface TweakableElementWrapperProps extends Styleable {
  element: React.ReactElement<React.PropsWithChildren<Styleable>>;
}

/** Apply props to cloned element */
export default function TweakableElementWrapper({
  element,
  className,
  style,
  children,
}: React.PropsWithChildren<TweakableElementWrapperProps>): JSX.Element {
  const cmp = React.Children.only(element);
  const nextProps: Styleable = {
    className: `${className}${cmp.props.className ? ` ${cmp.props.className}` : ''}`,
    style: style || cmp.props.style ? { ...cmp.props.style, ...style } : undefined,
  };
  // for elements such as input which not supports children
  if (!cmp.props.children && !children) {
    return React.cloneElement(cmp, nextProps);
  }
  return React.cloneElement(cmp, nextProps, children, cmp.props.children);
}
