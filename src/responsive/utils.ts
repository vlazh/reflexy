import { ViewSize } from '@js-toolkit/web-utils/responsive/ViewSize';

export type BreakpointsMergeType = 'up' | 'down';

export type Breakpoints<V = unknown> = Readonly<PartialRecord<ViewSize.Keys, V>>;

export interface MergeBreakpointsOptions<V = unknown> {
  /**
   * `down` - merge from top to down until current view size. Default.
   * `up` - merge from down to top until current view size.
   * `true` treats as `down`.
   * `false` - no merge, use only exact breakpoint.
   */
  merge?: boolean | BreakpointsMergeType | undefined;
  breakpoints: Breakpoints<V>;
}

export function forEachBreakpoints<V, A = V>(
  viewSize: ViewSize,
  breakpoints: Breakpoints<V>,
  merge: boolean | BreakpointsMergeType,
  callback: (value: V | undefined, acc: A, viewSize: ViewSize) => A,
  accumulator: A
): A {
  const mergeType: BreakpointsMergeType | false = merge === true ? 'down' : merge;

  if (!mergeType) {
    return callback(breakpoints[ViewSize.keyOf(viewSize)], accumulator, viewSize);
  }

  let acc = accumulator;
  const currentSizeValue = ViewSize.values[viewSize];

  if (mergeType === 'up') {
    // Снизу вверх до текущего размера.
    for (
      let i = 0, [sizeKey, { maxWidth }] = ViewSize.valueList[i];
      i < ViewSize.valueList.length && maxWidth <= currentSizeValue.maxWidth;
      i += 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i] || ['', { maxWidth: 0 }]
    ) {
      acc = callback(breakpoints[ViewSize.keyOf(sizeKey)], acc, sizeKey);
    }
  } else {
    // Сверху вниз до текущего размера.
    for (
      let i = ViewSize.valueList.length - 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i];
      i >= 0 && maxWidth >= currentSizeValue.maxWidth;
      i -= 1, [sizeKey, { maxWidth }] = ViewSize.valueList[i] || ['', { maxWidth: 0 }]
    ) {
      acc = callback(breakpoints[ViewSize.keyOf(sizeKey)], acc, sizeKey);
    }
  }

  return acc;
}

export function getLastMergedBreakpointsValue(
  viewSize: ViewSize,
  { merge = true, breakpoints }: MergeBreakpointsOptions<boolean | undefined>,
  fallbackResult: boolean
): boolean {
  return forEachBreakpoints(
    viewSize,
    breakpoints,
    merge,
    (value, acc) => {
      if (value != null) return value;
      return acc;
    },
    fallbackResult
  );
}
