/* eslint-disable no-param-reassign */
import path from 'path';
import { NormalModuleReplacementPlugin, ResolveData } from 'webpack';

type Filter = (resource: ResolveData) => boolean | undefined;

/** Replaces regular imports of `Flex` with `styled/jss/Flex`. */
export default class StyledReflexyJssWebpackPlugin extends NormalModuleReplacementPlugin {
  constructor(resourceRegex = /reflexy\/Flex\/Flex\.js/, filter: Filter | undefined = undefined) {
    // Works until webpack v5.49.0
    // super(/reflexy\/Flex\/Flex\.js/, '../styled/Flex/Flex.js');

    // Workaround for webpack v5.49.0+: https://github.com/webpack/webpack/issues/13957
    // const resourceRegex = /reflexy\/Flex\/Flex\.js|reflexy\/styled\/Flex\/Flex\.js/;
    super(resourceRegex, (resource) => {
      // console.log(resource.context, resource.request, resource);
      // console.log('***');
      if (!resource.createData || !resource.createData.userRequest) return;
      const filtered = filter && filter(resource);
      if (filtered == null || filtered) {
        const resolvedRequest = resource.createData.userRequest;
        resource.createData.resource = resolvedRequest.replace(
          resourceRegex,
          'reflexy/styled/jss/Flex/Flex.js'
        );
        resource.createData.context = path.dirname(resource.createData.resource);
      }
    });
  }
}
