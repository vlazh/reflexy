import React from 'react';
import Flex, { type FlexAllProps, type DefaultComponentType } from '../../Flex';
import useMediaQuery from '../useMediaQuery';
import { type ResponsiveProps, mergeBreakpointProps } from '../Responsive';
import type { WithFlexComponent } from '../../types';
import { copyInternalProps } from '../../utils';

export type ResponsiveFlexAllProps<C extends React.ElementType = DefaultComponentType> =
  ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C> & WithFlexComponent;

function ResponsiveFlex<C extends React.ElementType = DefaultComponentType>({
  FlexComponent = Flex,
  ...rest
}: ResponsiveFlexAllProps<C>): React.JSX.Element {
  const [viewSize] = useMediaQuery();
  // Trick for correct type inference
  const { p, ...mergedProps } = mergeBreakpointProps(
    viewSize,
    rest as ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>
  );
  return <FlexComponent p={p} {...mergedProps} />;
}

export default copyInternalProps(Flex, ResponsiveFlex);
