import React from 'react'
import DocsViewer, { DocsCode } from 'components/DocsViewer';

type TP = 'install' | 'installForTheming' | 'usageOfComponent' | 'usageOfScssTheme' | 'usageOfCssTheme';
const DOCS_CODE: DocsCode<TP> = {
  install: {
    html: /*html*/`npm install @material-lite/react @material-lite/react-cdk`
  },
  installForTheming: {
    html: /*html*/`npm install sass @material-lite/theming`
  },
  usageOfComponent: {
    jsx: /*jsx*/ `
      import React from 'react';
      import { MlButton } from '@material-lite/react';
      
      export default function App() {
        return (
          <div className="App">
            <MlButton>
              <button>Button</button>
            </MlButton>
          </div>
        )
      }
    `
  },
  usageOfScssTheme: {
    scss: /*css*/`
      @use '@material-lite/angular' as ml;

      $theme: ml.define-light-theme((
        color: ml.$indigo-pink-color
      ));
      
      @include ml.core();
      @include ml.themes($theme);
    `
  },
  usageOfCssTheme: {
    scss: /*css*/`
      @import '@material-lite/theming/prebuilt-themes/indigo-pink.min.css';
    `
  }
}

const GettingStarted = () => (
  <div className="docs-view docs-markdown">
    <h1>Getting Started</h1>

    <h2>Installing</h2>
    <DocsViewer code={DOCS_CODE.install} disableActions></DocsViewer>

    <h3>For theming</h3>
    <DocsViewer code={DOCS_CODE.installForTheming} disableActions></DocsViewer>


    <h2>Usage of Component</h2>
    <p>例として、<code>App.jsx</code>に<code>MlButton</code>コンポーネントを読み込んでみます。</p>
    <DocsViewer code={DOCS_CODE.usageOfComponent} disableActions></DocsViewer>
    <br></br>
    
    <p>
      次に、<code>src</code>ディレクトリ直下の<code>index.scss</code>にテーマの設定と読み込みをしていきます。<br></br>
      <span className="comment"><a href="https://www.npmjs.com/package/sass">Dart Sass</a><code>(npm i sass)</code>が必要になります。</span>
    </p>
    <DocsViewer code={DOCS_CODE.usageOfScssTheme} disableActions></DocsViewer>
    <br></br>

    <p>もし、<code>Scss (<a href="https://www.npmjs.com/package/sass">Dart Sass</a>)</code>を用いらない場合は、事前に用意された<span className="eng">CSS</span>ファイルを読み込むことでテーマを使用できます。</p>
    <DocsViewer code={DOCS_CODE.usageOfCssTheme} disableActions></DocsViewer>

  </div>
)

export default GettingStarted;