import React from 'react';
import type { DefaultComponentType } from '../../Flex';
import isHasRef from '../../isHasRef';
import type { AnyObject, TweakableComponentProps } from '../../types';
import viewSizeValues, { viewSizeValueList } from '../viewSizeValues';
import useMediaQuery from '../useMediaQuery';
import type ViewSize from '../ViewSize';

export type BreakpointsMergeType = 'up' | 'down';

export interface ResponsiveProps<Props extends AnyObject> {
  /**
   * `down` - merge from top to down until current view size. Default.
   * `up` - merge from down to top until current view size.
   * `true` treats as `down`.
   * `false` - no merge, use only exact breakpoint.
   */
  merge?: boolean | BreakpointsMergeType;
  /** Props per breakpoint */
  breakpoints: { [P in ViewSize]?: Partial<Props> };
}

type Combine<P extends AnyObject> = P & ResponsiveProps<P>;

export type ResponsiveAllProps<C extends React.ElementType = DefaultComponentType> = Combine<
  React.PropsWithChildren<TweakableComponentProps<C>>
>;

function mergeProps<Props extends AnyObject>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<Props>['breakpoints'],
  mergeType: BreakpointsMergeType
): Partial<Props> {
  const currentSizeValue = viewSizeValues[viewSize];
  const result = {};

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = viewSizeValueList[i];
      i < viewSizeValueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[sizeKey]);
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = viewSizeValueList.length - 1, [sizeKey, { maxWidth }] = viewSizeValueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[sizeKey]);
    }
  }

  return result as Props;
}

export function mergeBreakpointProps<Props extends AnyObject>(
  viewSize: ViewSize,
  { breakpoints, merge = true, ...rest }: ResponsiveProps<Props> & Props
): Partial<Props> {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;
  const merged = !mergeType ? breakpoints[viewSize] : mergeProps(viewSize, breakpoints, mergeType);
  if (merged) return { ...rest, ...merged };
  return rest as unknown as Partial<Props>;
}

export default function Responsive<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  const [viewSize] = useMediaQuery();
  const { component = 'div', children, ...rest } = mergeBreakpointProps(viewSize, props);

  type R = typeof rest & { componentRef?: any };

  if ((rest as R).componentRef && (typeof component === 'string' || isHasRef(component))) {
    const { componentRef, ...customComponentProps } = rest as R;
    return React.createElement(component, { ...customComponentProps, ref: componentRef }, children);
  }

  return React.createElement(component, rest, children);
}
