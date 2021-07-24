import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';
import { MlCardVariant } from 'src/material-lite/angular/card';

type TD = 'example';
const DOCS_CODE: DocsCode<TD> = {
  example: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>variant</span>
          <select [(ngModel)]="variant">
            <option value="raised">raised</option>
            <option value="stroked">stroked</option>
          </select>
        </div>
      </div>

      <div class="prod">
        <ml-card [variant]="variant">Card</ml-card>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component } from '@angular/core';
      import { MlCardVariant } from '@material-lite/angular/card';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html'
      })
      export class ExampleComponent {
        variant: MlCardVariant;
      }
    `,
  }
};
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  host: { class: 'docs-markdown' }
})
export class ExampleComponent {
  docsCode = DOCS_CODE;
  variant: MlCardVariant;
  constructor() {}
}
