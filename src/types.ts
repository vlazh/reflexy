import '@js-toolkit/utils/types';
import type React from 'react';
import type Flex from './Flex';
import type { DefaultComponentType } from './Flex';

export type ComponentProps<C extends React.ElementType = any> = undefined extends C
  ? Record<never, never>
  : React.ComponentPropsWithRef<C>;

// Since TS 3.7.3
// Use `Omit` (as copy of object type) to make TweakableComponentProps as object
// and to avoid `Rest types may only be created from object types.ts(2700)` error in Flex props.
export type GetComponentProps<C extends React.ElementType = any> = Omit<
  ComponentProps<C>,
  'component' /* if `C` is Flexed component and already contains `component` prop */
>;

export type TweakableComponentProps<C extends React.ElementType = any> = {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: C | undefined;
} & GetComponentProps<C>;

export interface WithFlexComponent<C extends React.ElementType = DefaultComponentType> {
  FlexComponent?: typeof Flex<C>;
}
