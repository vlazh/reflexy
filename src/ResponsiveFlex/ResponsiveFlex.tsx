import React, { useEffect } from 'react';
import Flex, { FlexAllProps, ComponentOrElement, DefaultComponentType } from '../Flex';
import Responsive, { ResponsiveProps, mergeResponsiveProps } from '../Responsive';

export type ResponsiveFlexAllProps<
  C extends ComponentOrElement = DefaultComponentType
> = ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

export default function ResponsiveFlex<C extends ComponentOrElement = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): JSX.Element {
  useEffect(() => {
    // Lazy init media queries
    if (!Responsive.isInitialized()) {
      Responsive.initialize();
    }
  }, []);

  const { children, ...rest } = mergeResponsiveProps(props);
  return React.createElement(Flex, rest, children);
}
