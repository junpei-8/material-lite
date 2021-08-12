import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'overview' | 'orientations' | 'position' | 'animations';
const DOCS_CODE: DocsCode<TD> = {
  overview: {
    html: /*html*/`
      <div class="wrapper">
        <ml-straight-tracker [targetIndex]="selectedIndex">
          <div class="ink-bar"></div>
        </ml-straight-tracker>
      
        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="selectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>
    `,
    typescript: /*javascript*/`
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.scss'],
      })
      export class ExampleComponent {
        selectedIndex: number = 0;
      }
    `,
    scss: /*css*/`
      .wrapper {
        position: relative; /* Important style!!! */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .item {
        width: 100%;
        max-width: 320px;
        text-align: center;
        font-weight: 500;
        padding: 8px 0;
    
        &:hover {
          background-color: rgba(0, 0, 0, 0.064);
        }
      }

      .ink-bar {
        height: 2px;
        background: #3F51B5; 
      }
    `,
  },

  orientations: {
    html: /*html*/`
      <div class="horizontal-wrapper">
        <ml-straight-tracker [targetIndex]="horizontalSelectedIndex">
          <div class="ink-bar"></div>
        </ml-straight-tracker>
      
        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="horizontalSelectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>


      <div class="vertical-wrapper">
        <ml-straight-tracker orientation="vertical" [targetIndex]="verticalSelectedIndex">
          <div class="ink-bar"></div>
        </ml-straight-tracker>

        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="verticalSelectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>
    `,
    typescript: /*javascript*/`
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.scss'],
      })
      export class ExampleComponent {
        horizontalSelectedIndex: number = 0;
        verticalSelectedIndex: number = 0;
      }
    `,
    scss: /*css*/`
      .item {
        text-align: center;
        font-weight: 500;
        padding: 8px 0;
    
        &:hover {
          background-color: rgba(0,0,0,.064);
        }
      }
    
      .horizontal-wrapper {
        position: relative; /* Important style!!! */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        .item {
          width: 100%;
          max-width: 320px;
        }
    
        .ink-bar {
          height: 2px;
          width: 100%;
          background: #3F51B5;
        }
      }
    
      .vertical-wrapper {
        position: relative; /* Important style!!! */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        .item {
          padding: 24px 0;
          width: 100%;
        }
    
        .ink-bar {
          width: 2px;
          height: 100%;
          background: #E91E63;
        }
      }
    `
  },

  position: {
    html: /*html*/`
      <div class="horizontal-wrapper">
        <ml-straight-tracker
          position="before"
          [targetIndex]="horizontalSelectedIndex"
        >
          <div class="ink-bar"></div>
        </ml-straight-tracker>
      
        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="horizontalSelectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>
      
      
      <div class="vertical-wrapper">
        <ml-straight-tracker
          position="before"
          orientation="vertical"
          [targetIndex]="verticalSelectedIndex"
        >
          <div class="ink-bar"></div>
        </ml-straight-tracker>
      
        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="verticalSelectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>
    `,
  },

  animations: {
    html: /*html*/`
      <div class="wrapper">
        <ml-straight-tracker
          [targetIndex]="selectedIndex"
          [transition]="{duration: '400ms', property: 'left'}"
        >
          <div class="ink-bar"></div>
        </ml-straight-tracker>
      
        <div
          class="item"
          *ngFor="let char of ['A', 'B', 'C']; let i = index;"
          (click)="selectedIndex = i"
        >
          item {{ char }}
        </div>
      </div>
    `,
  }
};

DOCS_CODE.position.typescript = DOCS_CODE.orientations.typescript;
DOCS_CODE.position.scss = DOCS_CODE.orientations.scss;

DOCS_CODE.animations.typescript = DOCS_CODE.overview.typescript;
DOCS_CODE.animations.scss = DOCS_CODE.overview.scss;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',

  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;

  overviewSelectedIndex = 0;

  orientations = {
    horSelectedIndex: 0,
    verSelectedIndex: 0
  }

  position = {
    horSelectedIndex: 0,
    verSelectedIndex: 0
  }

  animationsSelectedIndex = 0;

  constructor() {}
}
