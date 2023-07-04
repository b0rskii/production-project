import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
  locales: path.resolve(__dirname, 'public', 'locales'),
  buildLocales: path.resolve(__dirname, 'build', 'locales'),
};

export default (env: BuildEnv) => {
  const PORT = env.port || 3000;
  const MODE = env.mode || 'development';
  const API_URL = env.apiUrl || 'http://localhost:8000';
  const IS_ANALYZE = Boolean(env.isAnalyze);

  const isDev = MODE === 'development';

  const config = buildWebpackConfig({
    mode: MODE,
    paths,
    isDev,
    port: PORT,
    isAnalyze: IS_ANALYZE,
    apiUrl: API_URL,
    project: 'frontend',
  });

  return config;
};
