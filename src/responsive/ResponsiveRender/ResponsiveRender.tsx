import type React from 'react';
import { viewSizeValues, viewSizeValueList } from '../viewSizeValues';
import useMediaQuery from '../useMediaQuery';
import type ViewSize from '../ViewSize';
import type { BreakpointsMergeType, ResponsiveProps } from '../Responsive';

type Breakpoints = { [P in ViewSize]?: boolean | undefined };

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

  const currentSizeValue = viewSizeValues[viewSize];
  let lastValue = fallback;

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = viewSizeValueList[i];
      i < viewSizeValueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = viewSizeValueList[i] || ['', { maxWidth: 0 }]
    ) {
      const value = breakpoints[sizeKey];
      if (value != null) {
        lastValue = value;
      }
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = viewSizeValueList.length - 1, [sizeKey, { maxWidth }] = viewSizeValueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = viewSizeValueList[i] || ['', { maxWidth: 0 }]
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
  const [viewSize] = useMediaQuery();
  const render = mergeBreakpoints(viewSize, rest, false);
  if (!render) return null;
  return children as JSX.Element;
}
