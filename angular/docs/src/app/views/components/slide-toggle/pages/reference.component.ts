import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'importing' | 'inputDirectives' | 'outputDirectives' | 'members';
const DOCS_CODE: DocsCode<TD> = {
  importing: {
    typescript: `import { SlideToggleModule } from '@material-lite/angular/slide-toggle'`
  },

  inputDirectives: {
    typescript: /*javascript*/`
      type Falsy = false | undefined | null | '' | 0;

      /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
      @Input() checked: boolean;
      @Input() disabled: boolean;
      @Input() required: boolean;
      @Input('aria-label') ariaLabel: string;
      @Input('aria-labelledby') ariaLabelledby: string;
      @Input() id: string;
      @Input() name: string;
      @Input() labelPosition: 'before' | 'after';

      @Input('disableRipple') rippleIsDisabled: boolean;
      @Input() rippleConfig: MlRippleCoreConfig; // Not Falsy
    `
  },

  outputDirectives: {
    typescript: /*javascript*/`
      import { EventEmitter } from '@angular/core';

      class MlSlideToggleChange {
        source: MlSlideToggle;
        checked: boolean;
      };

      @Output('change') changeEmitter: EventEmitter<MlSlideToggleChange>;
      @Output('toggleChange') toggleChangeEmitter: EventEmitter<void>;
    `
  },

  members: {
    typescript: /*javascript*/`
      inputId: string;
      stringChecked: string;
      rippleCore: MlRippleCore;

      toggle(): void;
    `
  }
};
@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  host: { class: 'docs-reference' }
})
export class ReferenceComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
