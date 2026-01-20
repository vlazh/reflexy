import type React from 'react';
import type Flex from './Flex';

export const REFLEXY_KEY = Symbol.for('@reflexy');

export function copyInternalProps<T extends React.ComponentType<any>>(
  source: typeof Flex,
  target: T
): T {
  (target as AnyObject)[REFLEXY_KEY] = source[REFLEXY_KEY];
  return target;
}
