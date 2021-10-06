import { useContext } from 'react';
import useTheme from '@material-ui/styles/useTheme';
import { FlexContext } from '../FlexProvider';
import sharedDefaults from '../sharedDefaults';
import type { Theme } from './Flex';

export type UseFlexDefaultsResult = typeof sharedDefaults;

export default function useFlexDefaults(): UseFlexDefaultsResult {
  const context = useContext(FlexContext);
  const theme = useTheme<Theme | undefined>();

  const defaultUnit =
    context.defaultUnit ?? theme?.reflexy?.defaultUnit ?? sharedDefaults.defaultUnit;
  const defaultSize =
    context.defaultSize ?? theme?.reflexy?.defaultSize ?? sharedDefaults.defaultSize;
  const defaultSizes =
    context.defaultSizes ?? theme?.reflexy?.defaultSizes ?? sharedDefaults.defaultSizes;

  return { defaultUnit, defaultSize, defaultSizes };
}
