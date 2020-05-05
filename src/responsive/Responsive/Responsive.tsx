import React from 'react';
import type { DefaultComponentType, TweakableComponentProps } from '../../Flex';
import MediaQueries, { ViewSize } from '../MediaQueries';
import useMedia from '../useMediaQuery';

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
  C extends React.ElementType = DefaultComponentType
> = ResponsiveProps<React.PropsWithChildren<TweakableComponentProps<C>>> &
  React.PropsWithChildren<TweakableComponentProps<C>>;

function mergeProps<Props extends object>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<Props>['breakpoints'],
  mergeType: BreakpointsMergeType
): Partial<Props> {
  const currentSizeValue = MediaQueries.viewSizeValues[viewSize];
  const result = {};

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i];
      i < MediaQueries.viewSizeValueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[sizeKey]);
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = MediaQueries.viewSizeValueList.length - 1,
        [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[sizeKey]);
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

export default function Responsive<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  const viewSize = useMedia();
  const { component = 'div', children, ...rest } = mergeBreakpointProps(viewSize, props);
  return React.createElement(component, rest, children);
}
