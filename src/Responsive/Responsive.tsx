import React, { useEffect } from 'react';
import {
  initMediaQueries,
  isInitialized as isInit,
  getCurrentViewSize as getCurrent,
  ViewSize,
} from '../mediaQueries';
import { TweakableComponentType, DefaultComponentType, TweakableComponentProps } from '../Flex';

export interface ResponsiveProps<A extends object> {
  /** `true` - don't merge breakpoints props up to current size and use breakpoint props of current size only. */
  strictBreakpoints?: boolean;
  /** Props per breakpoint */
  breakpoints: { [P in ViewSize]?: A };
}

export type ResponsiveAllProps<
  C extends TweakableComponentType = DefaultComponentType
> = ResponsiveProps<React.PropsWithChildren<TweakableComponentProps<C>>> &
  React.PropsWithChildren<TweakableComponentProps<C>>;

const sizesMap: Record<ViewSize, number> = {
  [ViewSize.xxs]: 1,
  [ViewSize.xs]: 2,
  [ViewSize.s]: 3,
  [ViewSize.m]: 4,
  [ViewSize.l]: 5,
  [ViewSize.xl]: 6,
  [ViewSize.xxl]: 7,
};

/** Merges props from lower size to current */
function mergeProps<A extends object>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<A>['breakpoints']
): A {
  const size = sizesMap[viewSize];
  const sizes = Object.entries(sizesMap);
  const result = {};

  for (let i = 0; i < size; i += 1) {
    Object.assign(result, breakpoints[sizes[i][0]]);
  }

  return result as A;
}

export function mergeResponsiveProps<A extends object>({
  breakpoints,
  strictBreakpoints,
  ...rest
}: ResponsiveProps<A> & A): A {
  const currentViewSize = Responsive.getCurrentViewSize();

  if (!currentViewSize) {
    return rest as A;
  }

  const merged = strictBreakpoints
    ? breakpoints[currentViewSize]
    : mergeProps(currentViewSize, breakpoints);

  return {
    ...rest,
    ...merged,
  };
}

function Responsive<C extends TweakableComponentType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  useEffect(() => {
    // Lazy init media queries
    if (!Responsive.isInitialized()) {
      Responsive.initialize();
    }
  }, []);

  const { component = 'div', children, ...rest } = mergeResponsiveProps<
    React.PropsWithChildren<TweakableComponentProps<C>>
  >(props);

  if (React.isValidElement<React.PropsWithChildren<{}>>(component)) {
    const cmp = React.Children.only(component);
    // for elements such as input which not supports children
    if (!cmp.props.children && !children) {
      return React.cloneElement(cmp, rest);
    }
    return React.cloneElement(cmp, rest, children, cmp.props.children);
  }

  return React.createElement(component as React.ElementType, rest, children);
}

Responsive.isInitialized = isInit;
Responsive.initialize = initMediaQueries;
Responsive.getCurrentViewSize = getCurrent;

export default Responsive;
