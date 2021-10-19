import React, { useMemo } from 'react';
import Flex, { FlexAllProps, DefaultComponentType } from './Flex';
import type { AnyObject } from './types';

type PropsWithRef<P extends AnyObject> = P &
  (P extends { componentRef?: any } ? { ref?: P['componentRef'] } : {});

const FlexWithRef = React.forwardRef(
  ({ componentRef, ...rest }: FlexAllProps<DefaultComponentType>, ref: React.Ref<any>) => {
    const refCallback = useMemo<React.Ref<HTMLDivElement> | undefined>(
      () =>
        ref && componentRef
          ? (instance) => {
              [ref, componentRef].forEach((r) => {
                if (typeof r === 'function') {
                  r(instance);
                } else if (r) {
                  // eslint-disable-next-line no-param-reassign
                  (r as React.MutableRefObject<any>).current = instance;
                }
              });
            }
          : ref ?? componentRef,
      [componentRef, ref]
    );

    return <Flex componentRef={refCallback} {...rest} />;
  }
) as <C extends React.ElementType>(
  props: PropsWithRef<FlexAllProps<C> & { component: C }>
) => JSX.Element;

export default FlexWithRef;
