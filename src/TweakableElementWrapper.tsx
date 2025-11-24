import React, { Children, cloneElement } from 'react';
import type { Styleable } from './Flex';
import { defaultClassNameTransformer, defaultStyleTransformer } from './utils';

export interface TweakableElementWrapperProps extends Styleable {
  element: React.ReactElement<React.PropsWithChildren<Styleable>>;
  /** Defaults to `true`. */
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
}: React.PropsWithChildren<TweakableElementWrapperProps>): React.JSX.Element {
  const cmp = Children.only(element);
  const nextProps: Styleable = {
    ...(forwardProps && rest),
    ...cmp.props,
    className: defaultClassNameTransformer(className ?? '', cmp.props.className),
    style: defaultStyleTransformer(style, cmp.props.style),
  };
  // For elements such as input which does not supports children
  if (!cmp.props.children && !children) {
    return cloneElement(cmp, nextProps);
  }
  return cloneElement(cmp, nextProps, children, cmp.props.children);
}
