import { Observable, Observer, Subject, Subscription } from 'rxjs';

interface OverwriteObservable<T> extends Observable<T> { subscribe: any; }
export interface NoCompleteObservable<T> extends OverwriteObservable<T> {
  subscribe(observer?: Observer<T>): Subscription;
  subscribe(next: null | undefined, error: null | undefined): Subscription;
  subscribe(next: null | undefined, error: (error: any) => void): Subscription;
  subscribe(next: (value: T) => void, error: null | undefined): Subscription;
  subscribe(next?: (value: T) => void, error?: (error: any) => void): Subscription;
}

interface OverwriteSubjectBase<T> extends Subject<T> { complete: never; asObservable(): any; }
type OverwriteSubject<T> = OverwriteSubjectBase<T> & OverwriteObservable<T>;
export interface NoCompleteSubject<T> extends OverwriteSubject<T> {
  complete: never;
  asObservable(): NoCompleteObservable<T>;
}

export type LifecycleSubjectRef<T extends string> = {
  [key in T]: NoCompleteSubject<void>
} | {[key: string]: undefined};

export type LifecycleSubjectNexter<T extends string> = {
  [key in T]: () => void;
};

export type LifecycleObservableGetter<T extends string> = {
  [key in T]: () => NoCompleteObservable<T>;
};

export type lifecycleControllersFactory<T extends string> =
  () => [LifecycleSubjectNexter<T>, LifecycleObservableGetter<T>];

/**
 * 使用される`subject`のみ作成し、無駄な`subject`を作らないようにするのを操作するクラス(２つ)を作成し、その各クラスからインスタンスを作成し配列として提供する関数自体を作る関数。
 *
 * @returns 内部に作成した２つのクラスに、共通のSubjectの参照をもたせたインスタンスを配列にして返す関数。
 * - [0] Nexter： `subject.next()`を呼び出し、`subject`を閉じる関数をまとめたオブジェクト。`private`変数推奨。
 * - [1] Getter： `subject.asObservable()`を返す関数をまとめたオブジェクト。`public`変数推奨。
 */
export function createLifecycleControllersFactory<T extends string>(...keys: T[]): lifecycleControllersFactory<T> {
  class SubjectNexter {
    constructor(public subjectRef: LifecycleSubjectRef<T>) {}
  }

  class ObservableGetter {
    constructor(private _subjectRef: LifecycleSubjectRef<T>) {}
  }

  const subjectNexterProtoRef = SubjectNexter.prototype;
  const observableGetterProtoRef = ObservableGetter.prototype;

  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];

    // @ts-ignore
    subjectNexterProtoRef[key] = function() {
      callLifecycleSubjectNext(this.subjectRef, key);
    };

    // @ts-ignore
    observableGetterProtoRef[key] = function(): NoCompleteObservable<void> {
      // @ts-ignore
      return getLifecycleSubject(this._subjectRef, key);
    }
  }

  return () => {
    const subjectRef = {};
    return [new SubjectNexter(subjectRef), new ObservableGetter(subjectRef)] as any;
  };
}

function callLifecycleSubjectNext(subjectRef: LifecycleSubjectRef<any>, key: string): void {
  const subject = subjectRef[key];
  if (subject) {
    subject.next(); // @ts-ignore
    subject.observers = null;
    subject.isStopped = true;
  }
}

function getLifecycleSubject(subjectRef: LifecycleSubjectRef<any>, key: string): NoCompleteObservable<void>  {
  let subject = subjectRef[key];

  if (!subject) {
    subject = subjectRef[key] = new Subject() as any;
  }

  return subject!.asObservable() as any;
}
