import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'color' | 'type' | 'typeBP' | 'tae';
const DOCS_CODE: DocsCode<TD> = {
  color: {
    html: /*html*/`
      <div mlRipple mlRippleTheme="primary">primary</div>
      <div mlRipple mlRippleTheme="accent">accent</div>
      <div mlRipple mlRippleTheme="warn">warn</div>
    
      <div mlRipple mlRippleColor="#8BC34A">#8BC34A</div>
      <div mlRipple mlRippleColor="#03A9F4">#03A9F4</div>
    `
  },

  type: {
    html: /*html*/`
      <div mlRipple>Default</div>
      <div mlRipple mlRippleOverdrive>Overdrive</div>
    `
  },

  typeBP: {
    html: /*html*/`
      <div mlRipple [mlRippleOverdrive]="{ width: 500; height: 500; }"></div>
    `
  },

  tae: {
    html: /*html*/`
      <div>
        <div #trigger1>Trigger 1</div>
        <span>→</span>
        <div mlRipple [mlRippleTrigger]="trigger1"></div>
      </div>
      
      <div>
        <div #trigger2>Trigger 2</div>
        <span>→</span>
        <div mlRipple [mlRippleTrigger]="trigger2" mlRippleEntrance="center"></div>
      </div>
      
      <div>
        <div #trigger3>Trigger 3</div>
        <span>→</span>
        <div mlRipple [mlRippleTrigger]="trigger3" mlRippleEntrance="resonance"></div>
      </div>
    `
  }
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styles: [`
    .ml-ripple-outlet {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #9e9e9e;
    }

    .box {
      width: 80px;
      height: 80px;
    }

    .square-box {
      width: 160px;
      height: 80px;
    }

    .strong {
      margin: 0 8px;
      font-size: 16px;
      font-weight: bold;
    }

    .visible-ripple {
      overflow: visible;
    }

    .type-bp-form {
      flex-direction: column;
    }
    .type-bp-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 12px;
    }
    .type-bp-actions button {
      margin-bottom: 16px;
    }

    .tae-section {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
    }
    .tae-arrow {
      display: block;
      font-size: 32px;
      margin: auto 0;
    }
  `],
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;
  constructor() {}

  bpHeight: number = 250;
  bpWidth: number = 250;

  taeVisualize: boolean = false;
}
