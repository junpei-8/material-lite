import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';

type TP = 'overview';
const DOCS_CODE: DocsCode<TP> = {
  overview: {
    jsx: /*jsx*/`
    
    `
  }
}

export const Overview = () => (
  <div className="docs-markdown">
    <h2>Overview</h2>
  </div>
)
