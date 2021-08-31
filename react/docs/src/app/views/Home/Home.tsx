import React from 'react';
import './Home.scss';

import MlButton from '../../../material-lite/react/Button';
import { VERSION } from '../../../material-lite/react-cdk/utils';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div className="home">
      <header className="home-header ml-primary-style">
        <h1>
          <span className="home-heading-ml">Material Lite</span>
          <span className="home-heading-for ml-accent-color">for</span>
          <span className="home-heading-angular">React</span>
        </h1>

        <span className="home-heading-version">v{ VERSION }</span>
        <MlButton variant="raised">
          <Link to="/react/guide/getting-started" className="home-heading-button">Get started</Link>
        </MlButton>
      </header>

      <div className="home-body">
        <section className="home-section">
          <h2>インストール</h2>
          <div className="home-docs-codeblock">
            <pre className="prism"><code>npm i @material-lite/react @material-lite/react-cdk</code></pre>
          </div>

          <h3><span className="eng">Theming</span>に必要なライブラリのインストール</h3>
          <div className="home-docs-codeblock">
            <pre className="prism"><code>npm i sass @material-lite/theming</code></pre>
          </div>
        </section>

        <section className="home-section">
          <h2>概要</h2>
          <p><span className="eng ml-accent-color">Material Lite for Angular</span>をベースにした、<span className="eng">React</span>用のコンポーネントライブラリです。</p>
          <p>デザインや機能は<span className="eng ml-accent-color">Angular Material</span>を参考にさせてもらっています。</p>
        </section>
      </div>
    </div>
  )
};

export default Home;