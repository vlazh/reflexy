import sharedDefaults, { SharedDefaults } from './sharedDefaults';
import type { SpaceUnit } from './Flex';

export function defineSharedDefaults<T>(target: T): T & SharedDefaults {
  return Object.defineProperties(target, {
    defaultUnit: {
      configurable: true,
      enumerable: true,
      get() {
        return sharedDefaults.defaultUnit;
      },
      set(v: SpaceUnit) {
        sharedDefaults.defaultUnit = v;
      },
    },
    defaultSizes: {
      configurable: true,
      enumerable: true,
      get() {
        return sharedDefaults.defaultSizes;
      },
      set(v: SharedDefaults['defaultSizes']) {
        sharedDefaults.defaultSizes = v;
      },
    },
    defaultSize: {
      configurable: true,
      enumerable: true,
      get() {
        return sharedDefaults.defaultSize;
      },
      set(v: SharedDefaults['defaultSize']) {
        sharedDefaults.defaultSize = v;
      },
    },
  } as Record<keyof SharedDefaults, PropertyDescriptor>) as T & SharedDefaults;
}
