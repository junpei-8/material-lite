import { ReactElement, RefObject } from 'react';

// export * from './component';
export * from './core';
// export * from './directive';
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
export type Falsy = undefined | null;
export type FalsyObject<T> = {
  [P in keyof T]?: T[P] | Falsy
}

export type ComponentProps<E = HTMLDivElement> = {
  elementRef?: RefObject<E>
};

export type DirectiveProps<T extends string | React.JSXElementConstructor<any> = any, P = any> = {
  children: ReactElement<P, T>
};
