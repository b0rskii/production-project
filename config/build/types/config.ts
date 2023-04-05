export type BuildMode = 'production' | 'development';

export type BuildPaths = {
  entry: string;
  build: string;
  html: string;
  src: string;
};

export type BuildEnv = {
  port: number;
  mode: BuildMode;
  isAnalyze: boolean;
  apiUrl: string;
};

export type BuildOptions = {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  isAnalyze: boolean;
  apiUrl: string;
  project: 'frontend' | 'storybook' | 'jest';
};
