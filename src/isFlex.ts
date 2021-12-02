import type sharedDefaults from './sharedDefaults';

export function isFlex(component: React.ElementType): boolean {
  if (typeof component === 'function') {
    const flex = component as typeof component & typeof sharedDefaults;
    return flex.defaultUnit != null && flex.defaultSize != null && flex.defaultSizes != null;
  }

  return false;
}
