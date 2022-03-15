import sharedDefaults from './sharedDefaults';
import type { SpaceUnit } from './Flex';

export function defineSharedDefaults<T>(target: T): T & typeof sharedDefaults {
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
      set(v: typeof sharedDefaults.defaultSizes) {
        sharedDefaults.defaultSizes = v;
      },
    },
    defaultSize: {
      configurable: true,
      enumerable: true,
      get() {
        return sharedDefaults.defaultSize;
      },
      set(v: typeof sharedDefaults.defaultSize) {
        sharedDefaults.defaultSize = v;
      },
    },
  } as Record<keyof typeof sharedDefaults, PropertyDescriptor>) as T & typeof sharedDefaults;
}
