export type ObjValues<T extends Record<string, unknown>> = T[keyof T];
