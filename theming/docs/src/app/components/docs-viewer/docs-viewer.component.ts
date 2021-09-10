import { Attribute, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Falsy } from '@material-lite/angular-cdk/utils';
import { normalizeWhitespace, Prism } from '../../prism';

export type DocsCodeLanguage = 'typescript' | 'html' | 'scss';

export type DocsCode = {
  language: DocsCodeLanguage;
  text: string;
  name?: string;
  path?: string;
  highlighted?: boolean;
};

export type DocsCodeRef<KS extends string = string> = {
  [K in KS]: DocsCode | DocsCode[]
};

const CODE_NAME_REF = {
  html: 'HTML',
  scss: 'SCSS',
  typescript: 'TS',
};

interface Changes extends SimpleChanges {
  _code: SimpleChange;
  _hasHiddenCode: SimpleChange;
}

@Component({
  selector: 'docs-viewer',
  templateUrl: './docs-viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'docs-viewer' },
})
export class DocsViewerComponent implements OnChanges {
  codeNameRef = CODE_NAME_REF;
  /** @deprecated */
  @Input('code') _code: DocsCodeRef[number];
  codes: DocsCode[];

  @Input('disableActions')
  set setHasDisabledActions(disabled: boolean | Falsy) {
    // @ts-ignore
    this.hasDisabledActions =
      disabled || disabled === '';
  }
  readonly hasDisabledActions: boolean;

  /** @deprecated */
  @Input('hideCode') _hasHiddenCode: boolean | Falsy;

  selectedCodeText: string | null;
  selectedCodeIndex: number;

  constructor(
    @Attribute('defaultCodeIndex') public defaultCodeIndex: number
  ) {}

  ngOnChanges(ngChanges: Changes) {
    const codeChanges = ngChanges._code;
    const hasHiddenCodeChanges = ngChanges._hasHiddenCode;

    let hasHiddenCode: boolean | Falsy = hasHiddenCodeChanges?.currentValue;
    hasHiddenCode = hasHiddenCode || hasHiddenCode === '';

    if (codeChanges) {
      const value: DocsCodeRef[number] = codeChanges.currentValue;
      this.codes = Array.isArray(value)
        ? value
        : [value]

      if (this.hasDisabledActions === void 0) {
        // @ts-ignore
        this.hasDisabledActions = true;
      }
    }

    if (codeChanges || hasHiddenCodeChanges) {
      if (hasHiddenCode) {
        this.selectedCodeText = null;

      } else {
        const selectedCodeIndex = this.selectedCodeIndex;
        const index = selectedCodeIndex === 0
          ? 0
            // selectedCodeIndex が無い場合、selectedCodeIndex に defaultCodeIndex か 0 を代入し、index変数へ格納
          : selectedCodeIndex || (this.selectedCodeIndex = this.defaultCodeIndex || 0)
        this.selectCode(index);
      }
    }
  }

  selectCode(index: number): void {
    if (this.selectedCodeText && this.selectedCodeIndex === index) { return; }

    this.selectedCodeIndex = index;
    const code = this.codes[index];

    const highlighted = code.highlighted;
    if (highlighted) {
      this.selectedCodeText = code.text;

    } else {
      const codeLang = code.language;
      this.selectedCodeText = code.text
        = Prism.highlight(normalizeWhitespace(code.text), Prism.languages[codeLang], codeLang);

      code.highlighted = true;
    }
  }

  toggleHiddenCodeState(): void {
    if (this.selectedCodeText) {
      this.selectedCodeText = null;

    } else {
      this.selectCode(this.selectedCodeIndex);
    }
  }
}
