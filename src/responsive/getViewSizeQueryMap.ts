import ViewSize from './ViewSize';

export interface GetViewSizeQueryMapOptions {
  /** @deprecated @see https://stackoverflow.com/a/39401858 */
  deviceDimentions?: boolean | undefined;
}

export default function getViewSizeQueryMap({
  deviceDimentions,
}: GetViewSizeQueryMapOptions = {}): Record<ViewSize, string> {
  return ViewSize.valueList.reduce(
    (acc, [viewSize, { minWidth, maxWidth }]) => {
      const q = deviceDimentions
        ? `only screen and (min-device-width: ${minWidth}px) and (max-device-width: ${maxWidth}px)`
        : `only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
      acc[viewSize] = q;
      return acc;
    },
    {} as Record<ViewSize, string>
  );
}
