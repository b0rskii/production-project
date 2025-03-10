// eslint-disable-next-line no-unused-vars
export type RequestFn = (...args: any) => Promise<any>;
export type RequestData<T extends RequestFn> = Awaited<ReturnType<T>>;
