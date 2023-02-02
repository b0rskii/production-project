type Mode = Record<string, string | boolean>;

export const getClassNames = (className: string, modes: Mode, additional: string[] = []): string => {
  return [
    className,
    ...additional,
    ...Object.entries(modes)
      .filter(([_className, value]) => Boolean(value))
      .map(([className, _value]) => className)
  ].join(' ');
};
