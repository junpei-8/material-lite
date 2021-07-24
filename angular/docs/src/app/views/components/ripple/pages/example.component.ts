import { Component } from '@angular/core';
import { MlRippleAnimation, MlRippleEntrance } from 'src/material-lite/angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TP = 'example';
const DOCS_CODE: DocsCode<TP> = {
  example: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>theme</span>
          <input placeholder="theme" [(ngModel)]="theme" />
        </div>

        <div>
          <span>color</span>
          <input placeholder="color" [(ngModel)]="color" />
        </div>

        <div>
          <span>entrance</span>
          <select [(ngModel)]="entrance">
            <option value="default">default</option>
            <option value="center">center</option>
            <option value="resonance">resonance</option>
          </select>
        </div>

        <div>
          <span>opacity</span>
          <input
            placeholder="opacity"
            type="number"
            step="0.01"
            min="0"
            max="1"
            [(ngModel)]="opacity"
          />
        </div>

        <div>
          <span>radius</span>
          <input
            placeholder="radius"
            type="number"
            min="0"
            step="40"
            [(ngModel)]="radius"
          />
        </div>

        <div>
          <span>enter duration</span>
          <input
            placeholder="enter duration"
            type="number"
            min="0"
            [(ngModel)]="animation.enter"
          />
        </div>

        <div>
          <span>leave duration</span>
          <input
            placeholder="leave duration"
            type="number"
            min="0"
            [(ngModel)]="animation.leave"
          />
        </div>

        <label for="disabled">
          <input type="checkbox" id="disabled" [(ngModel)]="disabled" />
          disabled
        </label>

        <label for="overdrive">
          <input type="checkbox" id="overdrive" [(ngModel)]="overdrive" />
          overdrive
        </label>
      </div>

      <div class="prod">
        <div
          mlRipple
          [mlRippleDisabled]="disabled"
          [mlRippleOverdrive]="overdrive"
          [mlRippleEntrance]="entrance"
          [mlRippleTheme]="theme"
          [mlRippleColor]="color"
          [mlRippleOpacity]="opacity"
          [mlRippleRadius]="radius"
          [mlRippleAnimation]="animation"
          class="example-ripple"
        >
          RIPPLE
        </div>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component } from '@angular/core';
      import { MlRippleAnimation, MlRippleEntrance } from '@material-lite/angular/core';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.scss'],
      })
      export class ExampleComponent {
        disabled: boolean;
        overdrive: boolean;
      
        theme: string;
        color: string;
        opacity: number;
        radius: number;
      
        animation: MlRippleAnimation = {};

        entrance: MlRippleEntrance;
      }
    `,

    scss: /*css*/`
      .example-ripple {
        cursor: pointer;
        text-align: center;

        width: 320px;
        height: 320px;
        line-height: 320px;

        border: 1px solid #9E9E9E;
      }

      
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
    `,
  },
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  host: { class: 'docs-markdown' },
  styles: [`
    .example-ripple {
      cursor: pointer;
      text-align: center;
    
      width: 320px;
      height: 320px;
      line-height: 320px;
    
      border: 1px solid #9E9E9E;
    }
  `]
})
export class ExampleComponent {
  docsCode = DOCS_CODE;

  disabled: boolean;
  overdrive: boolean;

  theme: string;
  color: string;

  radius: number;
  opacity: number;

  animation: MlRippleAnimation = {};

  entrance: MlRippleEntrance;
  constructor() {}
}
