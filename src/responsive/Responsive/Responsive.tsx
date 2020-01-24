import React from 'react';
import { ViewSize } from '../MediaQueries';
import useMedia from '../useMediaQuery';
import { TweakableComponentType, DefaultComponentType, TweakableComponentProps } from '../../Flex';
import { sizesMap, sizes } from './viewSizes';

export type BreakpointsMergeType = 'up' | 'down';

export interface ResponsiveProps<Props extends object> {
  /**
   * `down` - merge from top to down until current view size.
   * `top` - merge from down to top until current view size.
   * `true` treats as `down`.
   * `false` - no merge, use only exact breakpoint.
   */
  merge?: boolean | BreakpointsMergeType;
  /** Props per breakpoint */
  breakpoints: { [P in ViewSize]?: Partial<Props> };
}

export type ResponsiveAllProps<
  C extends TweakableComponentType = DefaultComponentType
> = ResponsiveProps<React.PropsWithChildren<TweakableComponentProps<C>>> &
  React.PropsWithChildren<TweakableComponentProps<C>>;

function mergeProps<Props extends object>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<Props>['breakpoints'],
  mergeType: BreakpointsMergeType
): Partial<Props> {
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

  return result as Props;
}

export function mergeBreakpointProps<Props extends object>(
  viewSize: ViewSize,
  { breakpoints, merge = true, ...rest }: ResponsiveProps<Props> & Props
): Partial<Props> {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;
  const merged = !mergeType ? breakpoints[viewSize] : mergeProps(viewSize, breakpoints, mergeType);
  return { ...rest, ...merged };
}

export default function Responsive<C extends TweakableComponentType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  const viewSize = useMedia();
  const { component = 'div', children, ...rest } = mergeBreakpointProps(viewSize, props);
  return React.createElement(component, rest, children);
}
