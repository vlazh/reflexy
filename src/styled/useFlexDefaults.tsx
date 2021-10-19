import { useContext } from 'react';
import type useTheme from '@mui/system/useTheme';
import { FlexContext } from '../FlexProvider';
import sharedDefaults from '../sharedDefaults';
import type { Theme } from './Flex';

export type UseFlexDefaultsResult = typeof sharedDefaults;

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
