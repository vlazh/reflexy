import path from 'path';
import { NormalModuleReplacementPlugin } from 'webpack';

/** Replaces regular imports of `Flex` with `styled/Flex` */
export default class StyledReflexyWebpackPlugin extends NormalModuleReplacementPlugin {
  constructor(resourceRegex = /reflexy\/Flex\/Flex\.js/) {
    // Works until webpack v5.49.0
    // super(/reflexy\/Flex\/Flex\.js/, '../styled/Flex/Flex.js');

    // Workaround for webpack v5.49.0+: https://github.com/webpack/webpack/issues/13957
    super(resourceRegex, (resource) => {
      if (resource.createData && resource.createData.userRequest) {
        const resolvedRequest = resource.createData.userRequest;
        resource.createData.resource = resolvedRequest.replace(
          resourceRegex,
          'reflexy/styled/Flex/Flex.js'
        );
        resource.createData.context = path.dirname(resource.createData.resource);
      }
    });
  }
}
