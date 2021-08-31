import { Component } from 'react';

export * from './theme';
export * from './disable-ripple';
export * from './tabindex';

export type ComponentBehavior<P, T> = new (props: P) => Component<P> & T;

// type UnionToIntersection<U> = (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

// interface BehaviorMap {
//   theme: HasTheme;
//   disabledRipple: CanDisableRipple,
//   tabIndex: HasTabIndex
// }
// export type Behavior<K extends keyof BehaviorMap> = UnionToIntersection<BehaviorMap[K]>


// interface PrivateBehaviorMap {
//   theme: PrivateHasTheme;
//   disabledRipple: DisableRipple.PrivateMethods,
//   tabIndex: PrivateHasTabIndex
// }
// export type PrivateBehavior<K extends keyof PrivateBehaviorMap> = PrivateBehaviorMap[K];


// interface BehaviorPropsMap {
//   theme: ThemeProps;
//   disabledRipple: DisableRipple.Props,
//   tabIndex: TabIndexProps
// }
// export type BehaviorProps<K extends keyof BehaviorPropsMap> = UnionToIntersection<BehaviorPropsMap[K]>
