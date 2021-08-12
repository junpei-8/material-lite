import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TP = 'importing' | 'inputDirectives';
const DOCS_CODE: DocsCode<TP> = {
  importing: {
    typescript: `import { MlButtonModule } from '@material-lite/angular/button';`
  },

  inputDirectives: {
    typescript: /*javascript*/`
      type Falsy = false | undefined | null | '' | 0;

      type MlButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'fab' | 'icon';
      type MlButtonHoverAction = 'auto' | 'enabled' | 'disabled';
      
      /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
      @Input('mlButton') /* none */
      @Input('wrappedAnchor') hasWrappedAnchor: boolean;
      @Input() theme: string;
      @Input() variant: MlButtonVariant;
      @Input() hoverAction: MlButtonHoverAction;

      @Input('disableRipple') rippleIsDisabled: boolean;
      @Input() rippleConfig: MlRippleCoreConfig; // Not Falsy
    `
  }
}

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  host: { class: 'docs-reference' }
})
export class ReferenceComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
