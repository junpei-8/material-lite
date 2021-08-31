import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';

type TP = 'overview';
const DOCS_CODE: DocsCode<TP> = {
  overview: {
    jsx: /*jsx*/`
    
    `
  }
}

export const YourOwnThemes = () => (
  <div className="docs-markdown">
    <h2>Your <span className="ml-accent-color">own</span> themes</h2>
    <h4>
      Themingの方法に関しては、Angularと共通なので、<a  href="https://material-lite.web.app/angular/guide/theming/your-own-themes" target="_blank" rel="noopener noreferrer">こちらのページ</a>を参考にしてください。<br/>
      近々、Theming専用のページを公開しようと思います。
    </h4>
  </div>
)
