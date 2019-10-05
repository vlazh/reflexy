import React from 'react';
import Flex, { FlexAllProps, TweakableComponentType, DefaultComponentType } from './Flex';

const FlexWithRef = React.forwardRef(
  (props: FlexAllProps<DefaultComponentType>, ref: React.Ref<any>) => {
    return <Flex {...props} componentRef={ref} />;
  }
) as <C extends TweakableComponentType = DefaultComponentType>(
  props: Omit<FlexAllProps<C>, 'component' | 'componentRef'> & {
    component: C;
    ref?: undefined extends C
      ? unknown
      : ('ref' extends keyof React.ComponentPropsWithRef<C>
          ? React.ComponentPropsWithRef<C>['ref']
          : never);
  }
) => JSX.Element;

export default FlexWithRef;
