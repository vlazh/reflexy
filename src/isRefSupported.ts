/* eslint-disable dot-notation */
import React from 'react';

const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

export function isRefSupported(
  component: React.ElementType<any> | React.ReactElement<any, any>
): boolean {
  // React component
  if (
    typeof component === 'string' ||
    (typeof component === 'function' && component.prototype instanceof React.Component) ||
    REACT_FORWARD_REF_TYPE === component['$$typeof']
  ) {
    return true;
  }

  // React element
  if (component['$$typeof'] && component['type']) {
    return isRefSupported(component['type'] as typeof component);
  }

  return false;
}
