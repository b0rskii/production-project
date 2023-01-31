import { BuildOptions } from './types/config';
import { Configuration } from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolve } from './buildResolve';
import { buildDevServer } from './buildDevServer';

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
  const {mode, paths, isDev} = options;

  return {
    mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolve(),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(paths),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
