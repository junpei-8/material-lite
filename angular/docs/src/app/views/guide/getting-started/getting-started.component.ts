import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'install' | 'usageTypescript' | 'usageHtml' | 'usageScss';
const DOCS_CODE: DocsCode<TD> = {
  install: { html: 'npm install @material-lite/angular @material-lite/angular-cdk' },

  usageTypescript: {
    typescript: /*javascript*/`
      import { NgModule } from '@angular/core';
      import { MlButtonModule } from '@material-lite/angular/button';
      
      @NgModule({
        ...
        imports: [
          MlButtonModule,
          ...
        ],
        ...
      })
      export class AppModule {}
    `,
  },

  usageHtml: {
    html: /*html*/`
      <button mlButton theme="primary">Button</button>
    `
  },

  usageScss: {
    scss: /*css*/`
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
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  host: { class: 'docs-view docs-markdown' }
})
export class GettingStartedComponent {
  docsCode = DOCS_CODE;
}
