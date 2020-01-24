import React from 'react';
import { ViewSize } from '../MediaQueries';
import useMedia from '../useMediaQuery';
import { TweakableComponentType, DefaultComponentType, TweakableComponentProps } from '../../Flex';

export type BreakpointsMergeType = 'up' | 'down';

export interface ResponsiveProps<A extends object> {
  /**
   * `down` - merge from top to down until current view size.
   * `top` - merge from down to top until current view size.
   * `true` treats as `down`.
   * `false` - no merge, use only exact breakpoint.
   */
  merge?: boolean | BreakpointsMergeType;
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

const sizes = Object.entries(sizesMap) as [ViewSize, number][];

function mergeProps<A extends object>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<A>['breakpoints'],
  mergeType: BreakpointsMergeType
): A {
  const size = sizesMap[viewSize];
  const result = {};

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (let i = 0; i < size; i += 1) {
      Object.assign(result, breakpoints[sizes[i][0]]);
    }
  } else {
    // Сверху вниз до текущего размера.
    for (let i = sizes.length - 1; i >= size - 1; i -= 1) {
      Object.assign(result, breakpoints[sizes[i][0]]);
    }
  }

  return result as A;
}

export function mergeResponsiveProps<A extends object>(
  viewSize: ViewSize,
  { breakpoints, merge = true, ...rest }: ResponsiveProps<A> & A
): A {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;
  const merged = !mergeType ? breakpoints[viewSize] : mergeProps(viewSize, breakpoints, mergeType);
  return { ...rest, ...merged };
}

export default function Responsive<C extends TweakableComponentType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  const viewSize = useMedia();
  const { component = 'div', children, ...rest } = mergeResponsiveProps(viewSize, props);
  return React.createElement(component, rest, children);
}
