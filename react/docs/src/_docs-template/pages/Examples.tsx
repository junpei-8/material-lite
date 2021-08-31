import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';

type TP = 'example';
const DOCS_CODE: DocsCode<TP> = {
  example: {
    jsx: /*jsx*/`
    
    `
  }
}
export const Examples = () => {
  return (
    <div className="docs-markdown">
    </div>
  );
}
