import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import path from 'path';

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
};

export default (env: BuildEnv) => {
  const PORT = env.port || 3000;
  const MODE = env.mode || 'development';

  const isDev = MODE === 'development';

  const config = buildWebpackConfig({
    mode: MODE,
    paths,
    isDev,
    port: PORT,
  });

  return config;
};
