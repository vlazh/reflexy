/* eslint-disable dot-notation */
import React from 'react';
import type { AnyObject } from './types';

const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

export function isRefSupported(
  component: React.ElementType<any> | React.ReactElement<any, any>
): boolean {
  // React component
  if (
    typeof component === 'string' ||
    (typeof component === 'function' && component.prototype instanceof React.Component) ||
    (component as AnyObject)['$$typeof'] === REACT_FORWARD_REF_TYPE
  ) {
    return true;
  }

  // React element
  if (React.isValidElement(component)) {
    return isRefSupported(component['type'] as React.ElementType<any>);
  }

  return false;
}
