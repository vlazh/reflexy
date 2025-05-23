import React from 'react';
import useTheme from '@mui/system/useTheme';
import { FlexContext } from '../FlexProvider';
import type { SharedDefaults } from '../sharedDefaults';
import type { Theme } from './theme';

export type UseFlexDefaultsResult = SharedDefaults;

export default function useFlexDefaults(): UseFlexDefaultsResult {
  const context = React.use(FlexContext);
  const theme = useTheme<Theme | undefined>();

  const defaultUnit = theme?.reflexy?.defaultUnit ?? context.defaultUnit;
  const defaultSize = theme?.reflexy?.defaultSize ?? context.defaultSize;
  const defaultSizes = theme?.reflexy?.defaultSizes ?? context.defaultSizes;

  return { defaultUnit, defaultSize, defaultSizes };
}
