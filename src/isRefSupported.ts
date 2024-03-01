/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
import React from 'react';
import type { AnyObject } from './types';

export const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
export const REACT_MEMO_TYPE = Symbol.for('react.memo');

export function isRefSupported(
  component: React.ElementType<any> | React.ReactElement<any, any>
): boolean {
  // React component
  if (
    typeof component === 'string' ||
    (typeof component === 'function' && component.prototype instanceof React.Component)
  ) {
    return true;
  }

  if ((component as AnyObject)['$$typeof'] === REACT_FORWARD_REF_TYPE) {
    if ((component as AnyObject).__emotion_base)
      return isRefSupported((component as AnyObject).__emotion_base as React.ElementType<any>);
    return true;
  }

  if ((component as AnyObject)['$$typeof'] === REACT_MEMO_TYPE) {
    return isRefSupported((component as AnyObject).type as React.ElementType<any>);
  }

  // React element
  if (React.isValidElement(component)) {
    return isRefSupported(component.type as React.ElementType<any>);
  }

  return false;
}
