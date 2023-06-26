export const getKeysMap = <T>(obj: Record<string, unknown>) => {
  const keysMap: Record<string, string> = {};

  Object.keys(obj).forEach((key) => {
    keysMap[key] = key;
  });

  return keysMap as Record<keyof T, keyof T>;
};
