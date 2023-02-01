import { WebpackPluginInstance, ProgressPlugin } from 'webpack';
import { BuildOptions } from './types/config';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildPlugins = (options: BuildOptions): WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: options.paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    })
  ];
};
