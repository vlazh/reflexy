import { useContext } from 'react';
import type useTheme from '@mui/system/useTheme';
import { FlexContext } from '../FlexProvider';
import sharedDefaults from '../sharedDefaults';
import type { SpaceSize, SpaceUnit } from '../Flex';

export type UseFlexDefaultsResult = typeof sharedDefaults;

export interface Theme {
  reflexy?: {
    defaultUnit?: SpaceUnit;
    defaultSizes?: Record<SpaceSize, number>;
    defaultSize?: SpaceSize;
  };
}

export default function useFlexDefaults(useThemeHook: typeof useTheme): UseFlexDefaultsResult {
  const context = useContext(FlexContext);
  const theme = useThemeHook<Theme | undefined>();

  const defaultUnit =
    context.defaultUnit ?? theme?.reflexy?.defaultUnit ?? sharedDefaults.defaultUnit;
  const defaultSize =
    context.defaultSize ?? theme?.reflexy?.defaultSize ?? sharedDefaults.defaultSize;
  const defaultSizes =
    context.defaultSizes ?? theme?.reflexy?.defaultSizes ?? sharedDefaults.defaultSizes;

  return { defaultUnit, defaultSize, defaultSizes };
}
