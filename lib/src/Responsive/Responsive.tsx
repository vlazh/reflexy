import React from 'react';
import {
  initMediaQueries,
  isInitialized as isInit,
  getCurrentViewSize as getCurrent,
} from '../mediaQueries';
import { mergeResponsiveProps, ResponsiveProps } from '../responsive';
import { ComponentOrElement, DefaultComponentType, Componentable } from '../Flex';

export type ResponsiveAllProps<
  C extends ComponentOrElement = DefaultComponentType
> = ResponsiveProps<Componentable<C>> & Componentable<C>;

function Responsive<C extends ComponentOrElement = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  // Lazy init media queries
  if (!Responsive.isInitialized()) {
    Responsive.initialize();
  }

  const { component = 'div', children, ...rest } = mergeResponsiveProps(props) as any;

  if (React.isValidElement<React.PropsWithChildren<{}>>(component)) {
    const cmp = React.Children.only(component);
    // for elements such as input which not supports children
    if (!cmp.props.children && !children) {
      return React.cloneElement(cmp, rest);
    }
    return React.cloneElement(cmp, rest, children, cmp.props.children);
  }

  return React.createElement(component, rest, children);
}

Responsive.isInitialized = isInit;
Responsive.initialize = initMediaQueries;
Responsive.getCurrentViewSize = getCurrent;

export default Responsive;
