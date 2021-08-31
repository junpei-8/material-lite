import { MlObserver, MlSubject, MlSubscription } from './subject';

interface OverwriteObservable<T> extends MlObserver<T> { subscribe: any; }
export interface NoCompleteMlObservable<T> extends OverwriteObservable<T> {
  subscribe(observer?: MlObserver<T>): MlSubscription;
  subscribe(next: null | undefined, error: null | undefined): MlSubscription;
  subscribe(next: null | undefined, error: (error: any) => void): MlSubscription;
  subscribe(next: (value: T) => void, error: null | undefined): MlSubscription;
  subscribe(next?: (value: T) => void, error?: (error: any) => void): MlSubscription;
}

interface OverwriteSubjectBase<T> extends MlSubject<T> { complete: never; asObservable(): any; }
type OverwriteSubject<T> = OverwriteSubjectBase<T> & OverwriteObservable<T>;
export interface NoCompleteSubject<T> extends OverwriteSubject<T> {
  complete: never;
  asObservable(): NoCompleteMlObservable<T>;
}

export type LifecycleSubjectRef<T extends string> = {
  [key in T]: NoCompleteSubject<void>
} | {[key: string]: undefined};

export type LifecycleSubjectNextor<T extends string> = {
  [key in T]: () => void;
};

export type LifecycleObservableGetter<T extends string> = {
  [key in T]: () => NoCompleteMlObservable<T>;
};

export type lifecycleControllersFactory<T extends string> =
  () => [LifecycleSubjectNextor<T>, LifecycleObservableGetter<T>];

/**
 * 使用される`subject`のみ作成し、無駄な`subject`を作らないようにするのを操作するクラス(２つ)を作成し、その各クラスからインスタンスを作成し配列として提供する関数自体を作る関数。
 *
 * 主な役割は、クラスを作ること。
 *
 * @returns 内部に作成した２つのクラスに、共通のSubjectの参照をもたせたインスタンスを配列にして返す関数。
 * - [0] Nextor(造語)。`subject.next()`を呼び出し、`subject`を閉じる関数をまとめたオブジェクト。`private`変数推奨。
 * - [1] Getter。`subject.asObservable()`を返す関数をまとめたオブジェクト。`public`変数推奨。
 *
 * @returnsNaming
 * `material-lite`では、Reactっぽく `const useLifecycle = createLifecycleControllersFactory(...);`として使っている。
 */
export function createLifecycleControllersFactory<T extends string>(...keys: T[]): lifecycleControllersFactory<T> {
  class SubjectNexter {
    constructor(public subjectRef: LifecycleSubjectRef<T>) {}
  }

  class ObservableGetter { // @ts-ignore
    constructor(private _subjectRef: LifecycleSubjectRef<T>) {}
  }

  const subjectNextorProtoRef = SubjectNexter.prototype;
  const observableGetterProtoRef = ObservableGetter.prototype;

  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    // @ts-ignore
    subjectNextorProtoRef[key] = callLifecycleSubjectNext.bind(null, this.subjectRef, key);

    // @ts-ignore
    observableGetterProtoRef[key] = getLifecycleSubject.bind(null, this._subjectRef, key);
  }

  return () => {
    const subjectRef = {};
    return [new SubjectNexter(subjectRef), new ObservableGetter(subjectRef)] as any;
  };
}

function callLifecycleSubjectNext(ref: LifecycleSubjectRef<any>, key: string) {
  const subject = ref[key];
  if (subject) {
    subject.next(); // @ts-ignore
    subject.observers = null;
  }
}

function getLifecycleSubject<T extends string>(ref: LifecycleSubjectRef<T>, key: string): NoCompleteMlObservable<T>  {
  // @ts-ignore
  let subject = ref[key];

  if (!subject) {
    // @ts-ignore
    subject = ref[key] = new MlSubject();
  }

  return subject!.asObservable() as any;
}
