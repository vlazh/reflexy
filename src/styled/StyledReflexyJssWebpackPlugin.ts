/* eslint-disable no-param-reassign */
import path from 'path';
import { NormalModuleReplacementPlugin, ResolveData } from 'webpack';

/** Replaces regular imports of `Flex` with `styled/Flex` */
export default class StyledReflexyJssWebpackPlugin extends NormalModuleReplacementPlugin {
  constructor(filter?: (resource: ResolveData) => boolean | undefined) {
    // Works until webpack v5.49.0
    // super(/reflexy\/Flex\/Flex\.js/, '../styled/Flex/Flex.js');

    // Workaround for webpack v5.49.0+: https://github.com/webpack/webpack/issues/13957
    const resourceRegex = /reflexy\/Flex\/Flex\.js|reflexy\/styled\/Flex\/Flex\.js/;
    super(resourceRegex, (resource) => {
      if (!resource.createData) return;
      const filtered = filter && filter(resource);
      if (filtered == null || filtered) {
        const resolvedRequest = resource.createData.userRequest as string;
        resource.createData.resource = resolvedRequest.replace(
          resourceRegex,
          'reflexy/styled/jss/Flex/Flex.js'
        );
        resource.createData.context = path.dirname(resource.createData.resource);
      }
    });
  }
}
