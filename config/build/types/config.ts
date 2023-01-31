export type BuildMode = 'production' | 'development';

export type BuildPaths = {
  entry: string;
  build: string;
  html: string;
};

export type BuildEnv = {
  port: number;
  mode: BuildMode;
};

export type BuildOptions = {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
};
