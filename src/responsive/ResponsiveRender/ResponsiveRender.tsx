import React from 'react';
import { ViewSize } from '../MediaQueries';
import useMedia from '../useMediaQuery';
import { BreakpointsMergeType, ResponsiveProps } from '../Responsive';
import { sizesMap, sizes } from '../Responsive/viewSizes';

type Breakpoints = { [P in ViewSize]?: boolean };

export type ResponsiveRenderProps = React.PropsWithChildren<
  Breakpoints & Pick<ResponsiveProps<{}>, 'merge'>
>;

function mergeBreakpoints(
  viewSize: ViewSize,
  { merge = true, ...breakpoints }: ResponsiveRenderProps,
  fallback: boolean
): boolean {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;

  if (!mergeType) {
    return breakpoints[viewSize] ?? fallback;
  }

  const size = sizesMap[viewSize];
  let lastValue = fallback;

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (let i = 0; i < size; i += 1) {
      const value = breakpoints[sizes[i][0]];
      if (value != null) {
        lastValue = value;
      }
    }
  } else {
    // Сверху вниз до текущего размера.
    for (let i = sizes.length - 1; i >= size - 1; i -= 1) {
      const value = breakpoints[sizes[i][0]];
      if (value != null) {
        lastValue = value;
      }
    }
  }

  return lastValue;
}

export default function ResponsiveRender({
  children,
  ...rest
}: ResponsiveRenderProps): JSX.Element | null {
  const viewSize = useMedia();
  const render = mergeBreakpoints(viewSize, rest, false);
  if (!render) return null;
  return children as JSX.Element;
}
