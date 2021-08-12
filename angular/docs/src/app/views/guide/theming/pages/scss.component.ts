import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'preparation';
const DOCS_CODE: DocsCode<TD> = {
  preparation: {
    typescript: /*javascript*/`
    import { Component } from '@angular/core';
    import { MlTheming } from '@material-lite/angular/core';

    @Component({...})
    export class AppComponent {

      constructor(
        mlTheming: MlTheming
      ) {
        mlTheming.initialize(null);
      }

    }
    `
  }
};
@Component({
  selector: 'app-scss',
  templateUrl: './scss.component.html',
  host: { class: 'docs-markdown' }
})
export class ScssComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
