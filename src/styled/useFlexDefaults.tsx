import { useContext } from 'react';
import useTheme from '@mui/system/useTheme';
import { FlexContext } from '../FlexProvider';
import sharedDefaults, { SharedDefaults } from '../sharedDefaults';
import type { Theme } from './theme';

export type UseFlexDefaultsResult = SharedDefaults;

export default function useFlexDefaults(
  useThemeHook: typeof useTheme = useTheme
): UseFlexDefaultsResult {
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
