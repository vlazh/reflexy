import React from 'react';
import useMedia from '../useMediaQuery';
import { ResponsiveProps, mergeBreakpointProps } from '../Responsive';
import Flex, { FlexAllProps, TweakableComponentType, DefaultComponentType } from '../../Flex';

export type ResponsiveFlexAllProps<
  C extends TweakableComponentType = DefaultComponentType
> = ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

export default function ResponsiveFlex<C extends TweakableComponentType = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): JSX.Element {
  const viewSize = useMedia();
  const { children, ...rest } = mergeBreakpointProps(viewSize, props);
  return <Flex {...rest}>{children}</Flex>;
}
