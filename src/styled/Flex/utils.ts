import type { FlexProps, OverflowProps } from '../../Flex';

export const getFillValue = (propValue: FlexProps['vfill']): string | undefined => {
  return typeof propValue === 'number'
    ? `${Math.min(+propValue, 1) * 100}%`
    : (propValue && '100%') || undefined;
};

const getScrollableValue = (
  scrollableValue: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return typeof scrollableValue === 'string'
    ? scrollableValue
    : (scrollableValue === true && 'auto') || (scrollableValue === false && 'hidden') || undefined;
};

export const getOverflowValue = (
  overflowValue: OverflowProps['overflow'],
  scrollableValue: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return overflowValue ?? getScrollableValue(scrollableValue);
};
