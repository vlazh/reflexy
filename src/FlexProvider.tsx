import React, { useMemo } from 'react';
import type sharedDefaults from './sharedDefaults';

type SharedDefaults = typeof sharedDefaults;

export type FlexProviderProps = Partial<SharedDefaults>;

export const FlexContext = React.createContext<FlexProviderProps>({});

export default function FlexProvider({
  defaultUnit,
  defaultSize,
  defaultSizes,
  ...rest
}: React.PropsWithChildren<FlexProviderProps>): JSX.Element {
  const defaults = useMemo<FlexProviderProps>(
    () => ({ defaultUnit, defaultSize, defaultSizes }),
    [defaultSize, defaultSizes, defaultUnit]
  );

  return <FlexContext.Provider value={defaults} {...rest} />;
}
