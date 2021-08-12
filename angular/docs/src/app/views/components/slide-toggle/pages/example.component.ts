import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'example';
const DOCS_CODE: DocsCode<TD> = {
  example: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>theme</span>
          <input placeholder="theme" [(ngModel)]="theme" />
        </div>

        <label for="checked">
          <input type="checkbox" id="checked" [(ngModel)]="checked">
          Checked
        </label>

        <label for="disabled">
          <input type="checkbox" id="disabled" [(ngModel)]="disabled">
          Disabled
        </label>
      </div>

      <div class="prod">
        <ml-slide-toggle
          [theme]="theme"
          [checked]="checked"
          [disabled]="disabled"
        >
          Slide toggle
        </ml-slide-toggle>
      </div>
    `,
    typescript: /*javascript*/`
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
      })
      export class ExampleComponent {
        checked: boolean;
        disabled: boolean;
        theme: string = 'primary';
      }
    `,
    scss: /*css*/`
      /** Common style */
      .form, .prod {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #9E9E9E;
        box-sizing: border-box;

        > * {
          margin: 8px;
        }
      }

      .form {
        font-size: 14px;
        justify-content: space-evenly;

        span, label {
          margin-right: 8px;
        }
      }

      .prod {
        justify-content: center;
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
  constructor() {}

  checked: boolean;
  disabled: boolean;
  theme: string = 'primary';
}
