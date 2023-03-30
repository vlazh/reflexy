/* eslint-disable dot-notation */
import React from 'react';
import type { SharedDefaults } from './sharedDefaults';
import type { AnyObject } from './types';

const REACT_MEMO_TYPE = Symbol.for('react.memo');

export function isFlex(component: React.ElementType<any> | React.ReactElement<any, any>): boolean {
  // React component
  if (typeof component === 'function') {
    const flex = component as typeof component & SharedDefaults;
    return flex.defaultUnit != null && flex.defaultSize != null && flex.defaultSizes != null;
  }

  if ((component as AnyObject)['$$typeof'] === REACT_MEMO_TYPE) {
    return isFlex((component as AnyObject)['type'] as React.ElementType<any>);
  }

  // React element
  if (React.isValidElement(component)) {
    return isFlex(component['type'] as React.ElementType<any>);
  }

  return false;
}
