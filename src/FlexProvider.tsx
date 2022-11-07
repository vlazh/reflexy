import React, { useMemo } from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import sharedDefaults, { SharedDefaults } from './sharedDefaults';
import type { Theme } from './styled';

export type FlexProviderProps = Partial<SharedDefaults>;

export const FlexContext = React.createContext<FlexProviderProps>({});

export default function FlexProvider({
  defaultUnit = sharedDefaults.defaultUnit,
  defaultSize = sharedDefaults.defaultSize,
  defaultSizes = sharedDefaults.defaultSizes,
  ...rest
}: React.PropsWithChildren<FlexProviderProps>): JSX.Element {
  const [defaults, theme] = useMemo<[FlexProviderProps, Theme]>(() => {
    const values = Object.freeze<SharedDefaults>({ defaultUnit, defaultSize, defaultSizes });
    const t = Object.freeze<Theme>({ reflexy: values });
    return [values, t];
  }, [defaultSize, defaultSizes, defaultUnit]);

  return (
    <ThemeProvider theme={theme}>
      <FlexContext.Provider value={defaults} {...rest} />
    </ThemeProvider>
  );
}
