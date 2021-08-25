import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'overviewGlobal' | 'overviewCdk' | 'overviewCdk2';
const DOCS_CODE: DocsCode<TD> = {
  overviewGlobal: {
    scss: /*css*/`
      /* Your own themes file */
      @use 'src/app/app-theme.scss' as ml;

      .card {
        @include ml.elevation(1);
      }
    `
  },
  overviewCdk: {
    scss: /*css*/`
      @use '@material-lite/angular' as ml;

      .card {
        @include ml.cdk-elevation(1);
      }
    `
  },
  overviewCdk2: {
    scss: /*css*/`
      @use '@material-lite/angular-cdk' as ml-cdk;

      .card {
        @include ml-cdk.elevation(1);
      }
    `
  }
}

@Component({
  selector: 'app-elevation-styles',
  templateUrl: './elevation-styles.component.html',
  styleUrls: ['./elevation-styles.component.scss'],
  host: { class: 'docs-view docs-markdown' }
})
export class ElevationStylesComponent {
  docsCode = DOCS_CODE;
}
