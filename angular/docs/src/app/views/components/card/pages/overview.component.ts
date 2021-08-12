import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'variants' | 'contents' | 'usageOfContents' | 'image';
const DOCS_CODE: DocsCode<TD> = {
  variants: {
    html: /*html*/`
      <ml-card>Default</ml-card>
      <ml-card variant="raised">Raised</ml-card>
      <ml-card variant="stroked">Stroked</ml-card>
    `
  },

  contents: {
    typescript: `import { MlCardContentsModule } from '@material-lite/angular/card-contents';`
  },

  usageOfContents: {
    html: /*html*/`
      <ml-card>
        <ml-card-header>
          <img src="https://material-lite/angular/assets/img/japanese-hare-avatar.jpeg" mlCardAvatar />
          <ml-card-title>Japanese hare</ml-card-title>
          <ml-card-subtitle>Hare Breed</ml-card-subtitle>
        </ml-card-header>

        <img src="https://material-lite/angular/assets/img/japanese-hare.jpeg" mlCardImage />

        <ml-card-content>
          <p>The Japanese hare is reddish-brown. ...(omitted)</p>
        </ml-card-content>
        
        <ml-card-actions align='end'>
          <button mlButton>LIKE</button>
          <button mlButton>SHARE</button>
        </ml-card-actions>
      </ml-card>
    `,

    css: /*css*/`
      ml-card {
        max-width: 400px;
      }
    `
  },

  image: {
    html: /*html*/`
      <ml-card style="max-width: 320px">
        <ml-card-title>Japanese Sushi</ml-card-title>
        <img mlCardImage src="https://material-lite/angular/assets/img/sushi.jpeg" />
      </ml-card>

      <ml-card>
        <ml-card-title>Japanese Sushi</ml-card-title>
        <div mlCardImage src="https://material-lite/angular/assets/img/sushi.jpeg"></div>
      </ml-card>
    `
  }
};
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styles: [`
    .ml-card {
      font-family: Roboto;
    }
  `],
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
