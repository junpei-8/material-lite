import React, { useState } from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';
import MlCard, { MlCardVariant } from '../../../../../material-lite/react/Card/Card';

type TP = 'example';
const DOCS_CODE: DocsCode<TP> = {
  example: {
    jsx: /*jsx*/`
    
    `
  }
}
export const Examples = () => {
  const [variant, setVariant] = useState<MlCardVariant>('raised');

  return (
    <div className="docs-markdown">
      <h2>Square Button</h2>
      <DocsViewer code={DOCS_CODE.example} hideCode>
        <div className="form">
          <div>
            <span>variant</span>
            <select value={variant} onChange={e => setVariant(e.target.value as any)}>
              <option value="raised">raised</option>
              <option value="stroked">stroked</option>
            </select>
          </div>
        </div>

        <div className="prod">
          <MlCard variant={variant}>
            Card
          </MlCard>
        </div>
      </DocsViewer>
    </div>
  );
}