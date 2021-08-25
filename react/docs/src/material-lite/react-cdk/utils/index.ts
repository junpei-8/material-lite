export * from './component';
export * from './core';
export * from './directive';
export * from './fake-event-detection';
export * from './lifecycle';
export * from './listen';
export * from './noop';
export * from './pipe';
export * from './state';
export * from './subject';
export * from './transition-classes';

export type Class<T, A extends any[] = any[]> = new (...arg: A) => T;

// export type Falsy<T = unknown> = T extends object
//   ? { [P in keyof T]: T[P] }
//   : false | undefined | null | '' | 0;
export type Falsy = false | undefined | null | '' | 0;
export type FalsyObject<T> = {
  [P in keyof T]?: T[P] | Falsy
}
