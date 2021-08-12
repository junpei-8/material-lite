export * from './state';
export * from './noop';

export type Class<T, A extends any[] = any[]> = new (...arg: A) => T;

export type Falsy = false | undefined | null | '' | 0;
