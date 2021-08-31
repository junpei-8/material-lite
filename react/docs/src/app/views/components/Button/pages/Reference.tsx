import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';

type TP = 'importing';
const DOCS_CODE: DocsCode<TP> = {
  importing: {
    typescript: /*javascript*/`import { MlButton } from '@material-lite/react';`
  }
}
export const Reference = () => (
  <div className="docs-reference">
    <DocsViewer code={DOCS_CODE.importing} disableActions></DocsViewer>

    <h2>製作中</h2>
  </div>
)
