declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// eslint-disable-next-line no-unused-vars
declare const __IS_DEV__: boolean;
// eslint-disable-next-line no-unused-vars
declare const __API__: string;
// eslint-disable-next-line no-unused-vars
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest';

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

// eslint-disable-next-line no-unused-vars
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
