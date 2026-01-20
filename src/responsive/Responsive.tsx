import { createElement } from 'react';
import '@js-toolkit/utils/types';
import { ViewSize } from '@js-toolkit/web-utils/responsive/ViewSize';
import { useMediaQuery } from '@js-toolkit/react-hooks/useMediaQuery';
import type { DefaultComponentType } from '../Flex';
import type { TweakableComponentProps } from '../types';
import { forEachBreakpoints, type MergeBreakpointsOptions } from './utils';

export type ResponsiveProps<Props extends AnyObject> = MergeBreakpointsOptions<
  /** Props per breakpoint */
  Partial<Props> | undefined
>;

type Combine<P extends AnyObject> = P & ResponsiveProps<P>;

export type ResponsiveAllProps<C extends React.ElementType = DefaultComponentType> = Combine<
  React.PropsWithChildren<TweakableComponentProps<C>>
>;

export function mergeBreakpointProps<Props extends AnyObject>(
  viewSize: ViewSize,
  { breakpoints, merge = true, ...rest }: ResponsiveProps<Props> & Props
): Partial<Props> {
  const merged = forEachBreakpoints(
    viewSize,
    breakpoints,
    merge,
    (value, acc) => Object.assign(acc, value),
    {} as Partial<Props>
  );
  return { ...rest, ...merged };
}

export default function Responsive<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveAllProps<C>
): React.JSX.Element {
  const [viewSize] = useMediaQuery();
  const { component = 'div', children, ...rest } = mergeBreakpointProps(viewSize, props);
  return createElement(component as NonNullable<typeof component>, rest, children);
}
