import React from 'react';

export * from './state';
export * from './styling';
export * from './listen';
export * from './noop';
export * from './fake-event-detection';
export * from './transition-classes';
export * from './lifecycle';
export * from './core';
export * from './pipe';

export type Class<T, A extends any[] = any[]> = new (...arg: A) => T;

// export type Falsy<T = unknown> = T extends object
//   ? { [P in keyof T]: T[P] }
//   : false | undefined | null | '' | 0;
export type Falsy = false | undefined | null | '' | 0;
export type FalsyObject<T> = {
  [P in keyof T]?: T[P] | Falsy
}

export interface MlProps<T = HTMLDivElement> {
  elementRef?: React.RefObject<T>;
}