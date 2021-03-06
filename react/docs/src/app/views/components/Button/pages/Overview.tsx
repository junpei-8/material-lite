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
  <p><code>MlButton</code>???<span className="eng">Directive</span>???????????????<code>&lt;MlButton&gt;</code>?????????????????????????????????????????????????????????</p>
  <DocsViewer code={DOCS_CODE.overview} disableActions>
    <div className="prod">
      <MlButton>
        <button>Button</button>
      </MlButton>
    </div>
  </DocsViewer>

  <h2>Variants</h2>
  <p>??????????????????????????????????????????????????????<code>[variant]</code>?????????????????????????????????????????????</p>
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
  <p>????????????<span className="eng">theme</span>???<span className="eng">key</span>???<code>[theme]</code>??????????????????????????????????????????????????????????????????????????????</p>
  <p><span className="eng">theme</span>???????????????????????????<Link to="/react/guide/theming">?????????</Link>?????????????????????????????????????????????</p>
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
  <p>??????????????????????????????????????????????????????????????????<span className="strong"><span className="eng">Hover</span>???????????????</span>???<span className="strong"><span className="eng">Ripple</span>??????</span>?????????????????????</p>
  <p><code>&lt;a&gt;</code>???<code>&lt;button&gt;</code>???????????????????????????<span className="eng">padding</span>??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
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
  <p>??????????????????????????????????????????????????????????????????<code>[hoverAction]</code>????????????????????????</p>
  <p>?????????????????????<code>'auto'</code>?????????</p>
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
  <p><code>[disableRipple], [rippleConfig]</code>????????????????????????<span className="eng">Ripple</span>?????????????????????????????????????????????</p>
  <p><code>[rippleConfig]</code>????????????????????????<Link to="/react/components/ripple/overview">?????????</Link>?????????????????????????????????</p>
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
