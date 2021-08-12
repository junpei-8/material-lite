import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'install' | 'usageTypescript' | 'usageHtml' | 'setTheme';
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
      <button mlButton>Button</button>
    `
  },

  // setTheme: {
  //   typescript: /*javascript*/`
  //     import { Component } from '@angular/core';
  //     import { MlTheming } from '@material-lite/angular/core';
  //     import { ML_LIGHT_THEME, ML_INDIGO_PINK_PALETTE } from '@material-lite/angular/core/theme'

  //     @Component({
  //       ...
  //     })
  //     export class AppComponent {

  //       constructor(
  //         mlTheming: MlTheming
  //       ) {
  //         // Set theme
  //         mlTheming.initialize([
  //           {
  //             theme: ML_LIGHT_THEME,
  //             palette: ML_INDIGO_PINK_PALETTE,
  //           }
  //         ]);
  //       }

  //     }
  //   `
  // }
  setTheme: {
    scss: /*css*/`
      @use '@material-lite/angular/theming' as *;

      /* arg1: theme, arg2: palette, arg3?: include */
      @include ml-theming(light, indigo-pink);
    `
  }

}

@Component({
  selector: 'app-theming',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  host: { class: 'docs-view docs-markdown' }
})
export class GettingStartedComponent {
  docsCode = DOCS_CODE;
}
