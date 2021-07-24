import { Component } from '@angular/core';
import { MlButtonHoverAction, MlButtonVariant } from 'src/material-lite/angular/button';
import { DocsCode } from 'src/app/components/docs-viewer';

type TP = 'squareButton' | 'circleButton';
const DOCS_CODE: DocsCode<TP> = {
  squareButton: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>theme</span>
          <input placeholder="theme" [(ngModel)]="theme" />
        </div>
      
        <div>
          <span>variant</span>
          <select [(ngModel)]="variant">
            <option value="basic">basic</option>
            <option value="raised">raised</option>
            <option value="stroked">stroked</option>
            <option value="flat">flat</option>
          </select>
        </div>
      
        <div>
          <span>hoverAction</span>
          <select [(ngModel)]="hoverAction">
            <option value="auto">auto</option>
            <option value="enabled">enabled</option>
            <option value="disabled">disabled</option>
          </select>
        </div>
      
        <label for="disabled">
          <input type="checkbox" id="disabled" [(ngModel)]="disabled">Disabled
        </label>
      </div>
      
      <div class="prod">
        <button
          mlButton
          [disabled]="disabled"
          [variant]="variant"
          [theme]="theme"
          [hoverAction]="hoverAction"
        >
          BUTTON
        </button>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component } from '@angular/core';
      import { MlButtonHoverAction } from '@material-lite/angular/button';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html'
      })
      export class ExampleComponent {
        disabled: boolean;
        theme: string;
        variant: 'basic' | 'raised' | 'stroked' | 'flat';
        hoverAction: MlButtonHoverAction;
      }
    `,

    scss: /*css*/`
      /** Common style */
      .form, .prod {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #9E9E9E;
        box-sizing: border-box;
    
        > * {
          margin: 8px;
        }
      }
    
      .form {
        font-size: 14px;
        justify-content: space-evenly;
    
        span, label {
          margin-right: 8px;
        }
      }
    
      .prod {
        justify-content: center;
      }
    `
  },

  circleButton: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>theme</span>
          <input placeholder="theme" [(ngModel)]="theme" />
        </div>
      
        <div>
          <span>variant</span>
          <select [(ngModel)]="variant">
            <option value="fab">fab</option>
            <option value="icon">icon</option>
          </select>
        </div>
      
        <div>
          <span>hoverAction</span>
          <select [(ngModel)]="hoverAction">
            <option value="auto">auto</option>
            <option value="enabled">enabled</option>
            <option value="disabled">disabled</option>
          </select>
        </div>
      
        <label for="disabled">
          <input type="checkbox" id="disabled" [(ngModel)]="disabled">
          Disabled
        </label>
      </div>
      
      <div class="prod">
        <button
          mlButton
          [disabled]="disabled"
          [variant]="variant"
          [theme]="theme"
          [hoverAction]="hoverAction"
        >
          <svg>...(omitted)</svg>
        </button>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component } from '@angular/core';
      import { MlButtonHoverAction } from '@material-lite/angular/button';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html'
      })
      export class ExampleComponent {
        disabled: boolean;
        theme: string;
        variant: 'fab' | 'icon' = 'fab';
        hoverAction: MlButtonHoverAction;
      }
    `
  }
}
DOCS_CODE.circleButton.scss = DOCS_CODE.squareButton.scss;

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  host: { class: 'docs-markdown' }
})
export class ExampleComponent {
  docsCode = DOCS_CODE;

  constructor() {}

  suqDisabled: boolean;
  suqTheme: string;
  suqVariant: 'basic' | 'raised' | 'stroked' | 'flat';
  suqHoverAction: MlButtonHoverAction;

  cirDisabled: boolean;
  cirTheme: string;
  cirVariant: 'fab' | 'icon' = 'fab';
  cirHoverAction: MlButtonHoverAction;
}
