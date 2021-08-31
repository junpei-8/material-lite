import React from 'react';
import DocsViewer, { DocsCode } from 'components/DocsViewer';
import { Link } from 'react-router-dom';
import MlCard from '../../../../../material-lite/react/Card';

type TP = 'overview' | 'variants';
const DOCS_CODE: DocsCode<TP> = {
  overview: {
    jsx: /*jsx*/`
      import React from 'react';
      import MlButton from '@material-lite/react/Button';
      
      export default function Overview() {
        return <MlCard>Card</MlCard>
      }
    `
  },
  variants: {
    jsx: /*jsx*/`
      <MlCard variant="raised">Raised</MlCard>
      <MlCard variant="stroked">Stroked</MlCard>
    `
  }
}

export const Overview = () => (
  <div className="docs-markdown">
    <h2>Overview</h2>
    <p>
      現在は<code>&lt;MlCard&gt;</code>が<code>&lt;div&gt;</code>に置き換わりますが、廃止になる可能性が高いです。<br />
      コンポーネントはすべて<Link to="/react/components/button"><code>&lt;MlButton&gt;</code></Link>や<Link to="/react/components/button"><code>&lt;MlRipple&gt;</code></Link>のような<span className="eng">Directive</span>型へ統一することを検討しています。
    </p>
    <DocsViewer code={DOCS_CODE.overview} disableActions>
      <div className="prod">
        <MlCard>Card</MlCard>
      </div>
    </DocsViewer>


    <h2>Variants</h2>
    <p>
      現在は<code>&lt;MlCard&gt;</code>が<code>&lt;div&gt;</code>に置き換わりますが、廃止になる可能性が高いです。<br />
      コンポーネントはすべて<Link to="/react/components/button"><code>&lt;MlButton&gt;</code></Link>や<Link to="/react/components/button"><code>&lt;MlRipple&gt;</code></Link>のような<span className="eng">Directive</span>型へ統一することを検討しています。
    </p>
    <DocsViewer code={DOCS_CODE.variants} disableActions>
      <div className="prod">
        <MlCard variant="raised">Raised</MlCard>
        <MlCard variant="stroked">Stroked</MlCard>
      </div>
    </DocsViewer>
  </div>
)
