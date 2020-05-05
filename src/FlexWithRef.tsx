import React from 'react';
import Flex, { FlexAllProps, DefaultComponentType } from './Flex';

type PropsWithRef<P extends {}> = P &
  (P extends { componentRef?: any } ? { ref?: P['componentRef'] } : {});

const FlexWithRef = React.forwardRef(
  (props: FlexAllProps<DefaultComponentType>, ref: React.Ref<any>) => {
    return <Flex {...props} componentRef={ref} />;
  }
) as <C extends React.ElementType>(
  props: PropsWithRef<FlexAllProps<C> & { component: C }>
) => JSX.Element;

export default FlexWithRef;
