type Mode = Record<string, string | boolean | undefined>;

export const getClassNames = (
  className: string,
  modes: Mode = {},
  additional: Array<string | undefined> = [],
): string => [
  className,
  ...additional.filter(Boolean),
  ...Object.entries(modes)
    .filter(([_className, value]) => Boolean(value))
    .map(([className]) => className),
].join(' ');
