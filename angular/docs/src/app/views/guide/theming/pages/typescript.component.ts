import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'example';
const DOCS_CODE: DocsCode<TD> = {
  example: {}
};
@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  host: { class: 'docs-markdown' }
})
export class TypescriptComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}