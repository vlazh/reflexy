import React from 'react';
import '@js-toolkit/utils/types';
import type { DefaultComponentType } from '../../Flex';
import type { TweakableComponentProps } from '../../types';
import { buildRefProps } from '../../utils';
import useMediaQuery from '../useMediaQuery';
import ViewSize from '../ViewSize';

export type BreakpointsMergeType = 'up' | 'down';

export interface ResponsiveProps<Props extends AnyObject> {
  /**
   * `down` - merge from top to down until current view size. Default.
   * `up` - merge from down to top until current view size.
   * `true` treats as `down`.
   * `false` - no merge, use only exact breakpoint.
   */
  merge?: boolean | BreakpointsMergeType | undefined;
  /** Props per breakpoint */
  breakpoints: { [P in ViewSize.Keys]?: Partial<Props> | undefined };
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
  const currentSizeValue = ViewSize.values[viewSize];
  const result = {};

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = ViewSize.valueList[i];
      i < ViewSize.valueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[ViewSize.keyOf(sizeKey)]);
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = ViewSize.valueList.length - 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i] || ['', { maxWidth: 0 }]
    ) {
      Object.assign(result, breakpoints[ViewSize.keyOf(sizeKey)]);
    }
  }

  return result as Props;
}

export function mergeBreakpointProps<Props extends AnyObject>(
  viewSize: ViewSize,
  { breakpoints, merge = true, ...rest }: ResponsiveProps<Props> & Props
): Partial<Props> {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;
  const merged = !mergeType
    ? breakpoints[ViewSize.keyOf(viewSize)]
    : mergeProps(viewSize, breakpoints, mergeType);
  if (merged) return { ...rest, ...merged };
  return rest as unknown as Partial<Props>;
}

export default function Responsive<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): JSX.Element {
  const [viewSize] = useMediaQuery();
  const {
    component = 'div',
    componentRef,
    children,
    ...rest
  } = mergeBreakpointProps(viewSize, props);

  return React.createElement(
    component as NonNullable<typeof component>,
    Object.assign<AnyObject, AnyObject | undefined>(
      rest,
      buildRefProps(component as NonNullable<typeof component>, componentRef)
    ),
    children
  );
}
