import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';
import MlButton from '../../../../../material-lite/react/Button';
import { useState } from 'react';
import { MlButtonHoverAction, MlButtonVariant } from '../../../../../material-lite/react/Button/Button';

type TP = 'squareButton';
const DOCS_CODE: DocsCode<TP> = {
  squareButton: {
    jsx: /*jsx*/`
    
    `
  }
}
export const Examples = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('');
  const [variant, setVariant] = useState<MlButtonVariant>('basic');
  const [hoverAction, setHoverAction] = useState<MlButtonHoverAction>('auto');

  return (
    <div className="docs-markdown">
      <h2>Square Button</h2>
      <DocsViewer code={DOCS_CODE.squareButton} hideCode>
        <div className="form">
          <div>
            <span>theme</span>
            <input placeholder="theme" onChange={e => setTheme(e.target.value)} value={theme} />
          </div>
        
          <div>
            <span>variant</span>
            <select value={variant} onChange={e => setVariant(e.target.value as any)}>
              <option value="basic">basic</option>
              <option value="raised">raised</option>
              <option value="stroked">stroked</option>
              <option value="flat">flat</option>
            </select>
          </div>
        
          <div>
            <span>hoverAction</span>
            <select value={variant} onChange={e => setHoverAction(e.target.value as any)}>
              <option value="auto">auto</option>
              <option value="enabled">enabled</option>
              <option value="disabled">disabled</option>
            </select>
          </div>
        
          <label htmlFor="suqDisabled">
            <input type="checkbox" id="suqDisabled" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
            Disabled
          </label>
        </div>

        <div className="prod">
          <MlButton
            disabled={disabled}
            theme={theme}
            variant={variant}
            hoverAction={hoverAction}
          >
            <button>BUTTON</button>
          </MlButton>
        </div>
      </DocsViewer>
    </div>
  );
}
