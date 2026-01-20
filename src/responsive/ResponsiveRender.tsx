import { useMediaQuery } from '@js-toolkit/react-hooks/useMediaQuery';
import { getLastMergedBreakpointsValue, type MergeBreakpointsOptions } from './utils';

export type ResponsiveRenderProps = MergeBreakpointsOptions<boolean | undefined>['breakpoints'] &
  React.PropsWithChildren<Pick<MergeBreakpointsOptions<boolean | undefined>, 'merge'>>;

export default function ResponsiveRender({
  children,
  merge,
  ...rest
}: ResponsiveRenderProps): React.JSX.Element | null {
  const [viewSize] = useMediaQuery();
  const render = getLastMergedBreakpointsValue(viewSize, { merge, breakpoints: rest }, false);
  if (!render) return null;
  return children as React.JSX.Element;
}
