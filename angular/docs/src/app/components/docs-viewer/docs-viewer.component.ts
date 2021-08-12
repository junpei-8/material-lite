import { Attribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { normalizeWhitespace, Prism } from '../../prism';

export type DocsCode<T extends string = string> = {
  [key in T]: {
    [key: string]: string;
  } & {
    highlighted?: {
      [key: string]: boolean
    }
  };
};

const DISPLAY_NAME = {
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  typescript: 'TS',
};

@Component({
  selector: 'docs-viewer',
  templateUrl: './docs-viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'docs-viewer'
  }
})
export class DocsViewerComponent {
  @Input('hideCode')
  set setHasHiddenCode(hidden: boolean | '') {
    // @ts-ignore: Assign the readonly variable
    const result = this.hasHiddenCode =
      hidden === '' || hidden;

    if (!this.selectedCodeText && !result && this.selectedCodeType) {
      this.selectCode(this.selectedCodeType, true);
    }
  }
  readonly hasHiddenCode: boolean;


  @Input('disableActions')
  set setHasDisabledActions(disabled: boolean | '') {
    // @ts-ignore
    this.hasDisabledActions =
      disabled === '' || disabled;
  }
  readonly hasDisabledActions: boolean;

  @Input('codeDisplayNameRef')
  codeDisplayNameRef: { [key: string]: string } = DISPLAY_NAME;

  @Input('code') set setCodeRef(codeRef: DocsCode[number]) {
    this.codeRef = codeRef;

    const types = this.codeTypes = Object.keys(codeRef);
    this.displayCodeTypes = types.map(type => this.codeDisplayNameRef[type]);

    if (this.hasHiddenCode) {
      this.selectedCodeType = this.firstCodeType || types[0];

    } else if (!this.selectedCodeType) {
      this.selectCode(this.firstCodeType || types[0]);
    }
  }
  codeRef: DocsCode[number];
  codeTypes: string[];
  displayCodeTypes: string[];

  selectedCodeType: string;
  selectedCodeText: string;

  constructor(
    @Attribute('firstCodeType') public firstCodeType: string
  ) {}

  selectCode(type: string, farce?: boolean): void {
    if (!farce && this.selectedCodeType === type) { return; }

    this.selectedCodeType = type;
    const codeRef = this.codeRef;
    let highlighted = codeRef.highlighted;
    if (!highlighted) {
      highlighted = codeRef.highlighted = {};
    }

    if (highlighted[type]) {
      this.selectedCodeText = codeRef[type] as string;

    } else {
      this.selectedCodeText = codeRef[type]
        = Prism.highlight(normalizeWhitespace(codeRef[type]), Prism.languages[type], type);
      highlighted[type] = true;
    }
  }

}
