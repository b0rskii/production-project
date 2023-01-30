import { WebpackPluginInstance, ProgressPlugin } from 'webpack';
import { BuildPaths } from './types/config';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const buildPlugins = (paths: BuildPaths): WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin()
  ];
};
