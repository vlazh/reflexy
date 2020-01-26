import React from 'react';
import MediaQueries, { ViewSize } from '../MediaQueries';
import useMedia from '../useMediaQuery';
import { BreakpointsMergeType, ResponsiveProps } from '../Responsive';

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

  const currentSizeValue = MediaQueries.viewSizeValues[viewSize];
  let lastValue = fallback;

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i];
      i < MediaQueries.viewSizeValueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      const value = breakpoints[sizeKey];
      if (value != null) {
        lastValue = value;
      }
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = MediaQueries.viewSizeValueList.length - 1,
        [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = MediaQueries.viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      const value = breakpoints[sizeKey];
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
