import type { SpaceSize, SpaceUnit } from './Flex';

const sharedDefaults = {
  /** Default measure of space */
  defaultUnit: 'rem' as SpaceUnit,

  /** Predefined default space sizes */
  defaultSizes: {
    xs: 0.25,
    s: 0.5,
    m: 1,
    l: 1.5,
    xl: 2,
    xxl: 2.5,
  } as Record<SpaceSize, number>,

  defaultSize: 'm' as SpaceSize,
};

export default sharedDefaults;

export type SharedDefaults = typeof sharedDefaults;
