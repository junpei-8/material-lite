import { Component } from '@angular/core';
import { DocsCodeRef } from 'src/app/components/docs-viewer';

type TD = 'installing' | 'installDartSass' | 'settings';
const DOCS_CODE_REF: DocsCodeRef<TD> = {
  installing: {
    language: 'html',
    text: /*html*/`npm i @material-lite/theming`
  },

  installDartSass: {
    language: 'typescript',
    text:/*javascript*/`
      npm i sass
      // × npm i node-sass (node-sass is not supported)
    `
  },

  settings: {
    language: 'scss',
    text: /*css*/`
      @use '@material-lite/angular' as *;

      $material-lite: (
        default: define-light-theme((
          color: $indigo-pink-color
        ))
      );
      
      @include core();
      @include themes();
    `
  }

}

@Component({
  selector: 'app-advanced-theming',
  templateUrl: './advanced-theming.component.html',
  host: { class: 'docs-view' }
})
export class AdvancedThemingComponent {
  docsCodeRef = DOCS_CODE_REF;
}
