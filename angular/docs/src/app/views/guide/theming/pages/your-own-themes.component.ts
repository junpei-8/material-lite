import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'preparingExample' | 'preparingExample2' | 'preparingExample3';
const DOCS_CODE: DocsCode<TD> = {
  preparingExample: {
    scss: /*css*/`
      @forward '@material-lite/angular';
      @use '@material-lite/angular' as *;

      $material-lite: (
        default: define-light-theme((
          color: $indigo-pink-color
        ));
      )
    `
  },

  preparingExample2: {
    scss: /*css*/`
      @use 'src/app/app.theme' as ml;

      @include ml.core();
      @include ml.theme();
    `
  },

  preparingExample3: {
    scss: /*css*/`
      @use 'src/app/app.theme' as ml;

      .example-status-bar {
        /* Styling method */
        @include ml.style(background-color, (background, status-bar));
        
        padding: 16px;
        font-weight: 500;
      }
    `
  }
};
@Component({
  selector: 'app-your-own-themes',
  templateUrl: './your-own-themes.component.html',
  styleUrls: ['./your-own-themes.component.scss'],
  host: { class: 'docs-markdown' }
})
export class YourOwnThemesComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}