import { RuleSetRule } from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { BuildOptions } from './types/config';

export const buildLoaders = (options: BuildOptions): RuleSetRule[] => {
  const scssLoader = buildCssLoader(options.isDev);

  const babelLoader = buildBabelLoader(options);
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  const svgLoader = {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    tsxBabelLoader,
    scssLoader,
  ];
};
