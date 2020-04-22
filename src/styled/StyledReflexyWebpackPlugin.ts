import { NormalModuleReplacementPlugin } from 'webpack';

/** Replaces regular imports of `Flex` with `styled/Flex` */
export default class StyledReflexyWebpackPlugin extends NormalModuleReplacementPlugin {
  constructor() {
    super(/reflexy\/Flex\/Flex\.js/, '../styled/Flex/Flex.js');
  }
}
