import React from 'react';
import MlButton from '../../../../../material-lite/react/Button';
import DocsViewer, { DocsCode } from 'components/DocsViewer';
import { Link } from 'react-router-dom';

type TP = 'overview' | 'variants' | 'theming' | 'anchorButton' | 'disabledButton' | 'hoverActionTypes' | 'rippleConfig';
const DOCS_CODE: DocsCode<TP> = {
  overview: {
    jsx: /*jsx*/`
      import React from 'react';
      import { MlButton } from '@material-lite/react';
      
      export default function Overview() {
        return (
          <MlButton>
            <button>Button</button>
          </MlButton>
        )
      }
    `
  },

  variants: {
    jsx: /*jsx*/`
      <MlButton variant="basic">
        <button>Basic</button>
      </MlButton>

      <MlButton variant="raised">
        <button>Raised</button>
      </MlButton>

      <MlButton variant="stroked">
        <button>Stroked</button>
      </MlButton>

      <MlButton variant="flat">
        <button>Flat</button>
      </MlButton>

      <MlButton variant="icon">
        <button>
          <svg>...(omitted)</svg>
        </button>
      </MlButton>

      <MlButton variant="fab">
        <button>
          <svg>...(omitted)</svg>
        </button>
      </MlButton>
    `
  },

  theming: {
    jsx: /*jsx*/`
      <MlButton variant="basic" theme="primary">
        <button>Basic</button>
      </MlButton>

      <MlButton variant="raised" theme="accent">
        <button>Raised</button>
      </MlButton>

      <MlButton variant="stroked" theme="warn">
        <button>Stroked</button>
      </MlButton>

      <MlButton variant="flat" theme="primary">
        <button>Flat</button>
      </MlButton>

      <MlButton variant="icon" theme="accent">
        <button>
          <svg>...(omitted)</svg>
        </button>
      </MlButton>

      <MlButton variant="fab" theme="warn">
        <button>
          <svg>...(omitted)</svg>
        </button>
      </MlButton>
    `
  },

  anchorButton: {
    jsx: /*jsx*/`
      <a mlButton href="https://www.google.com/" target="_blank">Anchor</a>

      <button mlButton wrappedAnchor>
        <a href="https://www.google.com/" target="_blank">Wrapped Anchor</a>
      </button>
    `
  },

  disabledButton: {
    jsx: /*jsx*/`
      <MlButton disabled variant="basic">
        <button>Basic</button>
      </MlButton>

      <MlButton disabled variant="raised">
        <button>Raised</button>
      </MlButton>

      <MlButton disabled variant="stroked">
        <button>Stroked</button>
      </MlButton>

      <MlButton disabled variant="flat">
        <button>Flat</button>
      </MlButton>

      <MlButton disabled variant="icon">
        <button><svg>...(omitted)</svg></button>
      </MlButton>

      <MlButton disabled variant="fab">
        <button><svg>...(omitted)</svg></button>
      </MlButton>
    `
  },

  hoverActionTypes: {
    jsx: /*jsx*/`
      <button mlButton hoverAction="disabled">Disabled</button>
      <button mlButton variant="raised" hoverAction="enabled">Enabled</button>
    `
  },

  rippleConfig: {
    tsx: /*jsx*/`
      <MlButton disableRipple variant="raised">
        <button>Disabled</button>
      </MlButton>

      <MlButton rippleConfig={{ overdrive: true }} variant="raised">
        <button>Overdrive</button>
      </MlButton>
    `
  },
}

export const Overview = () => (
<div className="docs-markdown">
  <h2>Overview</h2>
  <p><code>MlButton</code>は<span className="eng">Directive</span>型なので、<code>&lt;MlButton&gt;</code>で１つの要素を囲むことで装飾できます。</p>
  <DocsViewer code={DOCS_CODE.overview} disableActions>
    <div className="prod">
      <MlButton>
        <button>Button</button>
      </MlButton>
    </div>
  </DocsViewer>

  <h2>Variants</h2>
  <p>ボタンのスタイルの種類は７種類あり、<code>[variant]</code>を変更することで設定できます。</p>
  <DocsViewer code={DOCS_CODE.variants} disableActions>
    <div className="prod">
      <MlButton variant="basic">
        <button>Basic</button>
      </MlButton>

      <MlButton variant="raised">
        <button>Raised</button>
      </MlButton>

      <MlButton variant="stroked">
        <button>Stroked</button>
      </MlButton>

      <MlButton variant="flat">
        <button>Flat</button>
      </MlButton>

      <MlButton variant="icon">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>

      <MlButton variant="fab">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>
    </div>
  </DocsViewer>


  <h2>Theming</h2>
  <p>設定した<span className="eng">theme</span>の<span className="eng">key</span>を<code>[theme]</code>に入力することで、それに対応した配色に変更できます。</p>
  <p><span className="eng">theme</span>の設定に関しては、<Link to="/react/guide/theming">こちら</Link>のページを参考にしてください。</p>
  <DocsViewer code={DOCS_CODE.theming} disableActions>
    <div className="prod">
      <MlButton variant="basic" theme="primary">
        <button>Basic</button>
      </MlButton>

      <MlButton variant="raised" theme="accent">
        <button>Raised</button>
      </MlButton>

      <MlButton variant="stroked" theme="warn">
        <button>Stroked</button>
      </MlButton>

      <MlButton variant="flat" theme="primary">
        <button>Flat</button>
      </MlButton>

      <MlButton variant="icon" theme="accent">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>

      <MlButton variant="fab" theme="warn">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>
    </div>
  </DocsViewer>


  <h2>Anchor button</h2>
  <p>アンカーボタンのスタイルは２パターン存在し、<span className="strong"><span className="eng">Hover</span>時の背景色</span>と<span className="strong"><span className="eng">Ripple</span>の色</span>が異なります。</p>
  <p><code>&lt;a&gt;</code>を<code>&lt;button&gt;</code>で内包したときに、<span className="eng">padding</span>の影響でクリックしてもリンクが反応しない現象が起こりますが、その現象を回避できます。</p>
  <DocsViewer code={DOCS_CODE.anchorButton} disableActions>
    <div className="prod">
      <MlButton>
        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Anchor</a>
      </MlButton>

      <MlButton wrappedAnchor>
        <button>
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Wrapped Anchor</a>
        </button>
      </MlButton>
    </div>
  </DocsViewer>


  <h2>Disabled button</h2>
  <DocsViewer code={DOCS_CODE.disabledButton} disableActions>
    <div className="prod">
      <MlButton disabled variant="basic">
        <button>Basic</button>
      </MlButton>

      <MlButton disabled variant="raised">
        <button>Raised</button>
      </MlButton>

      <MlButton disabled variant="stroked">
        <button>Stroked</button>
      </MlButton>

      <MlButton disabled variant="flat">
        <button>Flat</button>
      </MlButton>

      <MlButton disabled variant="icon">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>

      <MlButton disabled variant="fab">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
      </MlButton>
    </div>
  </DocsViewer>


  <h2>Hover action types</h2>
  <p>ホバー時の背景色の変更を有効にするかどうかを<code>[hoverAction]</code>で設定できます。</p>
  <p>デフォルト値は<code>'auto'</code>です。</p>
  <DocsViewer code={DOCS_CODE.hoverActionTypes} disableActions>
    <div className="prod">
      <MlButton hoverAction="disabled">
        <button>Disabled</button>
      </MlButton>

      <MlButton variant="raised" hoverAction="enabled">
        <button>Enabled</button>
      </MlButton>
    </div>
  </DocsViewer>


  <h2>Ripple config</h2>
  <p><code>[disableRipple], [rippleConfig]</code>を用いることで、<span className="eng">Ripple</span>の設定をカスタマイズできます。</p>
  <p><code>[rippleConfig]</code>の値に関しては、<Link to="/react/components/ripple/overview">こちら</Link>を参考にしてください。</p>
  <DocsViewer code={DOCS_CODE.rippleConfig} disableActions>
    <div className="prod">
      <MlButton disableRipple variant="raised">
        <button>Disabled</button>
      </MlButton>

      <MlButton rippleConfig={{ overdrive: true }} variant="raised">
        <button>Overdrive</button>
      </MlButton>
    </div>
  </DocsViewer>
</div>
)
