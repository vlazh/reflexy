import React from 'react';
import Flex, { FlexAllProps, DefaultComponentType } from '../../Flex';
import useMedia from '../useMediaQuery';
import { ResponsiveProps, mergeBreakpointProps } from '../Responsive';

export type ResponsiveFlexAllProps<
  C extends React.ElementType = DefaultComponentType
> = ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

export default function ResponsiveFlex<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): JSX.Element {
  const viewSize = useMedia();
  const { children, ...rest } = mergeBreakpointProps(viewSize, props);
  return <Flex {...rest}>{children}</Flex>;
}
