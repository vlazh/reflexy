/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable dot-notation */
import React from 'react';

const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

export default function isHasRef(component: React.ComponentType | React.ElementType): boolean {
  if (
    typeof component === 'string' ||
    (typeof component === 'function' && component.prototype instanceof React.Component) ||
    REACT_FORWARD_REF_TYPE === component['$$typeof']
  ) {
    return true;
  }

  if (component['$$typeof'] && component['type']) {
    return isHasRef(component['type']);
  }

  return false;
}
