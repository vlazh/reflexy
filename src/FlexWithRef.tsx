import React from 'react';
import Flex, { FlexAllProps, ComponentOrElement, DefaultComponentType } from './Flex';

const FlexWithRef = React.forwardRef((props: FlexAllProps<any>, ref: React.Ref<any>) => {
  return <Flex {...props} componentRef={ref} />;
}) as <C extends ComponentOrElement = DefaultComponentType>(
  props: Omit<FlexAllProps<C>, 'component' | 'componentRef'> & {
    component: NonNullable<FlexAllProps<C>['component']>;
    ref?: C extends React.ElementType
      ? ('ref' extends keyof React.ComponentPropsWithRef<C>
          ? React.ComponentPropsWithRef<C>['ref']
          : never)
      : never;
  }
) => JSX.Element;

export default FlexWithRef;
