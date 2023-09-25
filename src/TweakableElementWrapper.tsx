import React from 'react';
import type { Styleable } from './Flex';
import { defaultClassNameTransformer, defaultStyleTransformer } from './utils';

export interface TweakableElementWrapperProps extends Styleable {
  element: React.ReactElement<React.PropsWithChildren<Styleable>>;
  forwardProps?: boolean;
}

/** Apply props to cloned element */
export default function TweakableElementWrapper({
  element,
  className,
  style,
  children,
  forwardProps = true,
  ...rest
}: React.PropsWithChildren<TweakableElementWrapperProps>): JSX.Element {
  const cmp = React.Children.only(element);
  const nextProps: Styleable = {
    ...(forwardProps && rest),
    ...cmp.props,
    className: defaultClassNameTransformer(className ?? '', cmp.props.className),
    style: defaultStyleTransformer(style, cmp.props.style),
  };
  // For elements such as input which does not supports children
  if (!cmp.props.children && !children) {
    return React.cloneElement(cmp, nextProps);
  }
  return React.cloneElement(cmp, nextProps, children, cmp.props.children);
}
