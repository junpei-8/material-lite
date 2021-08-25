import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'preparation';
const DOCS_CODE: DocsCode<TD> = {
  preparation: {
    typescript: /*javascript*/`
    import { Component } from '@angular/core';
    import { MlTheming } from '@material-lite/angular/core';
    `
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
