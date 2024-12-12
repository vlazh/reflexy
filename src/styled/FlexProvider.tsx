import React, { useContext, useMemo } from 'react';
import ThemeProvider, { type ThemeProviderProps } from '@mui/system/ThemeProvider';
import useTheme from '@mui/system/useTheme';
import FlexProviderBase, { FlexContext, type FlexProviderProps } from '../FlexProvider';
import type { Theme } from './theme';

export { type FlexProviderProps };

function ReflexyThemeProvider(props: Omit<ThemeProviderProps, 'theme'>): React.JSX.Element {
  const { defaultUnit, defaultSize, defaultSizes } = useContext(FlexContext);

  const theme = useMemo(
    () => Object.freeze<Theme>({ reflexy: { defaultUnit, defaultSize, defaultSizes } }),
    [defaultSize, defaultSizes, defaultUnit]
  );

  return <ThemeProvider theme={theme} {...props} />;
}

export default function FlexProvider({
  defaultUnit,
  defaultSize,
  defaultSizes,
  children,
  ...rest
}: React.PropsWithChildren<FlexProviderProps>): React.JSX.Element {
  const upperTheme = useTheme<Theme | undefined>();

  return (
    <FlexProviderBase
      defaultUnit={defaultUnit ?? upperTheme?.reflexy?.defaultUnit}
      defaultSize={defaultSize ?? upperTheme?.reflexy?.defaultSize}
      defaultSizes={defaultSizes ?? upperTheme?.reflexy?.defaultSizes}
      {...rest}
    >
      <ReflexyThemeProvider>{children}</ReflexyThemeProvider>
    </FlexProviderBase>
  );
}
