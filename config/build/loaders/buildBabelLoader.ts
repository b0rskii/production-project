import { BuildOptions } from '../types/config';
import babelPropsRemovePlugin from '../../babel/babelPropsRemovePlugin';

type BuildBabelLoaderProps = BuildOptions & { isTsx?: boolean };

export const buildBabelLoader = ({ isDev, isTsx }: BuildBabelLoaderProps) => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
        [
          '@babel/plugin-transform-typescript',
          { isTsx },
        ],

        '@babel/plugin-transform-runtime',

        !isDev && isTsx && [
          babelPropsRemovePlugin,
          { propsToRemove: ['data-testid'] },
        ],

        isDev && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    },
  },
});
