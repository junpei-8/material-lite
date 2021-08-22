import { ElementRef } from '@angular/core';
import { Falsy } from '@material-lite/angular-cdk/utils';
import { NoConstructor } from './mixin';

export declare abstract class CanTheme {
  protected abstract _elementRef: ElementRef<HTMLElement>;
  theme: string | Falsy;
}

export function mixinTheme(base: NoConstructor<any>): NoConstructor<CanTheme> {
  // @ts-ignore
  return class extends base {
    _elementRef: ElementRef<HTMLElement>;
    private _theme: string | Falsy;

    get theme(): string | Falsy { return this._theme; }
    set theme(theme: string | Falsy) {
      const classList = this._elementRef.nativeElement.classList;

      if (this._theme) {
        classList.remove('ml-' + this._theme);
      }

      if (theme) {
        classList.add('ml-' + theme);
      }

      this._theme = theme;
    }
  };
}

mixinTheme.prototype.id = 2;
