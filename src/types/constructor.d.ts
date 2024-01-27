// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any> = new (...args: any[]) => T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractConstructor<T = any> = abstract new (...args: any[]) => T
