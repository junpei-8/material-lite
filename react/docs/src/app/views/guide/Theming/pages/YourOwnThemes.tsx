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
  </div>
)
