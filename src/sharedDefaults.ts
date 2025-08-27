import type { SpaceSize, SpaceUnit } from './Flex';

const sharedDefaults = {
  /** Default measure of space. Defaults to `rem`. */
  defaultUnit: 'rem' as SpaceUnit,

  /** Predefined default space sizes. */
  defaultSizes: {
    /** Defaults to `0.25`. */
    xs: 0.25,
    /** Defaults to `0.5`. */
    s: 0.5,
    /** Defaults to `1`. */
    m: 1,
    /** Defaults to `1.5`. */
    l: 1.5,
    /** Defaults to `2`. */
    xl: 2,
    /** Defaults to `2.5`. */
    xxl: 2.5,
  } satisfies Record<SpaceSize, number>,

  /** Defaults to `m`. */
  defaultSize: 'm' as SpaceSize,
};

export default sharedDefaults;

export type SharedDefaults = typeof sharedDefaults;
