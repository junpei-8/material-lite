export * from './status';
// export * from './styling';
export * from './listen';
export * from './noop';
export * from './fake-event-detection';
export * from './run-outside-ng-zone';
export * from './token.service';
export * from './transition-classes';
export * from './lifecycle';
export * from './core';

export type Class<T, A extends any[] = any[]> = new (...arg: A) => T;

// export type Falsy<T = unknown> = T extends object
//   ? { [P in keyof T]: T[P] }
//   : false | undefined | null | '' | 0;
export type Falsy = false | undefined | null | '' | 0;
export type FalsyObject<T> = {
  [P in keyof T]?: T[P] | Falsy
}

export interface MlDocument {
  head: HTMLHeadElement;
  body: HTMLBodyElement;
  createElement: (tagName: string, options?: ElementCreationOptions) => HTMLElement;
  createComment: (data: string) => Comment;
}
