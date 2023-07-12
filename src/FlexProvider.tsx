import React, { useMemo } from 'react';
import sharedDefaults, { type SharedDefaults } from './sharedDefaults';
import type { OptionalToUndefined } from './types';

export type FlexProviderProps = OptionalToUndefined<Partial<SharedDefaults>>;

export const FlexContext = React.createContext<SharedDefaults>(sharedDefaults);

export default function FlexProvider({
  defaultUnit = sharedDefaults.defaultUnit,
  defaultSize = sharedDefaults.defaultSize,
  defaultSizes = sharedDefaults.defaultSizes,
  ...rest
}: React.PropsWithChildren<FlexProviderProps>): JSX.Element {
  const defaults = useMemo(() => {
    return Object.freeze<SharedDefaults>({ defaultUnit, defaultSize, defaultSizes });
  }, [defaultSize, defaultSizes, defaultUnit]);

  return <FlexContext.Provider value={defaults} {...rest} />;
}
