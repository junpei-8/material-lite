import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'example';
const DOCS_CODE: DocsCode<TD> = {
  example: {
    html: /*html*/`
    `,
    typescript: /*javascript*/`
    `,
    scss: /*css*/`
    `,
  }
};
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
