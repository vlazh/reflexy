/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import path from 'path';
import { NormalModuleReplacementPlugin } from 'webpack';

/** Replaces regular imports of `Flex` with `styled/Flex` */
export default class StyledReflexyWebpackPlugin extends NormalModuleReplacementPlugin {
  constructor() {
    // Works until webpack v5.49.0
    // super(/reflexy\/Flex\/Flex\.js/, '../styled/Flex/Flex.js');

    // Workaround for webpack v5.49.0+: https://github.com/webpack/webpack/issues/13957
    super(/reflexy\/Flex\/Flex\.js/, (resource) => {
      if (resource.createData) {
        const resolvedRequest = resource.createData.userRequest as string;
        resource.createData.resource = resolvedRequest.replace(
          /reflexy\/Flex\/Flex\.js/,
          'reflexy/styled/Flex/Flex.js'
        );
        resource.createData.context = path.dirname(resource.createData.resource);
      }
    });
  }
}
