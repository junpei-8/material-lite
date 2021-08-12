import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'overview' | 'theming' | 'rippleConfig';
const DOCS_CODE: DocsCode<TD> = {
  overview: {
    html: /*html*/`
      <ml-slide-toggle>Slide me!</ml-slide-toggle>
    `
  },

  theming: {
    html: /*html*/`
      <ml-slide-toggle theme="primary">Primary</ml-slide-toggle>
      <ml-slide-toggle theme="accent">Accent</ml-slide-toggle>
      <ml-slide-toggle theme="warn">Warn</ml-slide-toggle>
    `
  },

  rippleConfig: {
    html: /*html*/`
      <ml-slide-toggle theme="primary" disableRipple>Ripple is disabled</ml-slide-toggle>
      <ml-slide-toggle theme="primary" [rippleConfig]="{ overdrive: true }">Overdrive ripple</ml-slide-toggle>
    `
  }
};
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
