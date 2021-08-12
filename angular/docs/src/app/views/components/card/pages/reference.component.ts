import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'importing' | 'cardInputDirectives' | 'cardImageInputDirectives' | 'cardImageMembers' | 'cardActionsInputDirectives';
const DOCS_CODE: DocsCode<TD> = {
  importing: {
    typescript: /*javascript*/`
      import { MlCardModule } from '@material-lite/angular/card';
      import { MlCardContentsModule } from '@material-lite/angular/card-contents';
    `
  }
  ,

  cardInputDirectives: {
    typescript: /*javascript*/`
      type Falsy = false | undefined | null | '' | 0;

      type MlCardVariant = 'raised' | 'stroked';

      /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
      @Input('variant') variant: MlCardVariant;
    `,
  },

  cardImageInputDirectives: {
    typescript: /*javascript*/`
    type Falsy = false | undefined | null | '' | 0;

    type MlCardImageSize = 'fw' | 'sm' | 'md' | 'lg' | 'xl';

    /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
    @Input('src') src: string;
    @Input('mlCardImageSize') size: MlCardImageSize;
  `
  },

  cardImageMembers: {
    typescript: /*javascript*/`isImageElement: boolean;`
  },

  cardActionsInputDirectives: {
    typescript: /*javascript*/`
    type Falsy = false | undefined | null | '' | 0;

    type MlCardActionsAlign = 'start' | 'end';

    /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
    @Input('align') align: MlCardActionsAlign;
    `
  }
};
@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  host: { class: 'docs-reference' }
})
export class ReferenceComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
