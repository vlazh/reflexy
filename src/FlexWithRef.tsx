import React, { useMemo } from 'react';
import Flex, { FlexAllProps, DefaultComponentType } from './Flex';
import { defineSharedDefaults } from './defineSharedDefaults';
import type { AnyObject } from './types';

type PropsWithRef<P extends AnyObject> = P &
  (P extends { componentRef?: any | undefined } ? { ref?: P['componentRef'] | undefined } : {});

type GetProps<P extends AnyObject> = P extends { componentRef?: any }
  ? Omit<P, 'component'>
  : P extends { ref?: any | undefined }
  ? P
  : P & { ref?: never | undefined };

type FlexWithRefProps<C extends React.ElementType> = { component: C } & GetProps<FlexAllProps<C>>;

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
) as <C extends React.ElementType = DefaultComponentType>(
  props: PropsWithRef<FlexWithRefProps<C>>
) => JSX.Element;

export default defineSharedDefaults(FlexWithRef);
