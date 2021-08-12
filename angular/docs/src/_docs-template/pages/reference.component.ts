import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'importing' | 'inputDirectives';
const DOCS_CODE: DocsCode<TD> = {
  importing: {
    typescript: `import { NAME } from '@material-lite/angular/name';`
  },

  inputDirectives: {
    typescript: /*javascript*/`
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
