export const getTypedEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;
