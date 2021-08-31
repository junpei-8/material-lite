import { FalsyObject } from '@material-lite/react-cdk/utils';
import React, { ReactNode } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MlButton from '../../../material-lite/react/Button';
import { normalizeWhitespace, Prism } from '../../prism';

export type DocsCode<T extends string = string> = {
  [key in T]: {
    [key: string]: string;
  } & {
    highlighted?: {
      [key: string]: boolean
    }
  };
};

type Props = {
  code: DocsCode[number];

} & FalsyObject<{
  children: ReactNode;
  hideCode: boolean;
  disableActions: boolean;
  firstCodeType: string;
  codeDisplayNameRef: { [key: string]: string };
}>

const DISPLAY_NAME = {
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  typescript: 'TS',
  jsx: 'JSX',
  tsx: 'TSX'
};

const DocsViewer = (props: Props) => {
  const [hasHiddenCode, setHasHiddenCode] = useState(props.hideCode);

  const [codeData, setCodeData] = useState<{ types: string[], displayTypes: string[] }>({ types: [], displayTypes: [] });
  const [selectedCode, setSelectedCode] = useState<{type: string, text: string}>({} as any);

  const selectCode = (type: string, farce?: boolean) => {
    if (!farce && selectedCode.type === type) { return; }

    const codeRef = props.code;

    // setSelectedCodeType(type);
    let highlighted = codeRef.highlighted;
    if (!highlighted) {
      highlighted = codeRef.highlighted = {};
    }

    if (highlighted[type]) {
      setSelectedCode({ type, text: codeRef[type] });

    } else {
      const text = codeRef[type]
        = Prism.highlight(normalizeWhitespace(codeRef[type]), Prism.languages[type], type);

      setSelectedCode({ type, text });
      highlighted[type] = true;
    }
  }


  useEffect(() => {
    const selected = selectedCode;
    if (!selected.text && !props.hideCode && selected.type) {
      selectCode(selected.type, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.hideCode]);


  useEffect(() => {
    const codeRef = props.code;

    const types = Object.keys(codeRef);
    const displayNameRef = props.codeDisplayNameRef || DISPLAY_NAME;

    setCodeData({ types, displayTypes: types.map(type => displayNameRef[type]) })

    if (hasHiddenCode) {
      const type = props.firstCodeType || types[0];
      setSelectedCode(({ text }) => ({ text, type }));

    } else if (!selectedCode.type) {
      selectCode(props.firstCodeType || types[0]);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code])


  const toggleHidden = () => setHasHiddenCode(state => !state);

  return (
    <div className="docs-viewer">
      <div className="docs-viewer-content">
        { props.children }
      </div>

      <div className="docs-viewer-codeblock">
        {
          props.disableActions
            ? null
            : <div>
              {
                hasHiddenCode
                  ? null
                  : <nav className="docs-viewer-codeblock-nav">
                      { 
                        codeData.types.map((type, i) => (
                          <MlButton variant="flat" hoverAction="enabled" theme={type === selectedCode.type ? 'primary' : ''} key={i}>
                            <button className="docs-viewer-codeblock-nav-button" onClick={() => selectCode(type)}>
                              { codeData.displayTypes[i] }
                            </button>
                          </MlButton>
                        ))
                      }
                    </nav>
              }

              <div className="docs-viewer-codeblock-actions">
                <MlButton variant="icon">
                  <button onClick={toggleHidden}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                  </button>
                </MlButton>
              </div>
            </div>
        }
        {
          hasHiddenCode
            ? null
            : <pre className="prism">
                <code
                  className={'prism-' + selectedCode.type}
                  dangerouslySetInnerHTML={{__html: selectedCode.text}}
                ></code>
              </pre>
        }
      </div>
    </div>
  )
}

export default DocsViewer;