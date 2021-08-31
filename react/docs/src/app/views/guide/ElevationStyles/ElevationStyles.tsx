import React from 'react'
import DocsViewer, { DocsCode } from 'components/DocsViewer';
import './ElevationStyles.scss';
import { Link } from 'react-router-dom';


type TD = 'overviewGlobal' | 'overviewCdk' | 'overviewCdk2';
const DOCS_CODE: DocsCode<TD> = {
  overviewGlobal: {
    scss: /*css*/`
      /* Your own themes file */
      @use 'src/app/app-theme.scss' as ml;

      .card {
        @include ml.elevation(1);
      }
    `
  },
  overviewCdk: {
    scss: /*css*/`
      @use '@material-lite/angular' as ml;

      .card {
        @include ml.cdk-elevation(1);
      }
    `
  },
  overviewCdk2: {
    scss: /*css*/`
      @use '@material-lite/angular-cdk' as ml-cdk;

      .card {
        @include ml-cdk.elevation(1);
      }
    `
  }
}
const ElevationStyles = () => (
  <div className="docs-view docs-markdown guide-elevation-styles">
    <h1>Elevation styles</h1>
    
    <h2>Overview</h2>
    <div className="docs-product">
      <div className="card">Elevation level 1</div>
    </div>

    <h4>独自のテーマを使用する場合（<Link to="/react/guide/elevation-styles">参照</Link>）</h4>
    <DocsViewer code={DOCS_CODE.overviewGlobal} disableActions></DocsViewer>

    <h4>独自のテーマを使用しない場合</h4>
    <DocsViewer  code={DOCS_CODE.overviewCdk} disableActions></DocsViewer>
    <h4 style={{textAlign: 'center', margin: '4px 0'}}>OR</h4>
    <DocsViewer  code={DOCS_CODE.overviewCdk2} disableActions></DocsViewer>

    <h2>Level</h2>
    <div className="docs-product">
      <div className="level-card level-1">1</div>
      <div className="level-card level-8">8</div>
      <div className="level-card level-16">16</div>
      <div className="level-card level-24">24</div>
    </div>
  </div>
)

export default ElevationStyles;
