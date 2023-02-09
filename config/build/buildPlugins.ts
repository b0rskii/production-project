import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginInstance, ProgressPlugin, DefinePlugin } from 'webpack';
import { BuildOptions } from './types/config';

export const buildPlugins = (options: BuildOptions): WebpackPluginInstance[] => {
  const { paths, isDev } = options;

  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ];
};
