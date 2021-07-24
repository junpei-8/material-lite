import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';
import { MlStraightTrackerOrientation, MlStraightTrackerPosition, MlStraightTrackerSizingMode } from 'src/material-lite/angular-cdk/straight-tracker';

type TD = 'example';
const DOCS_CODE: DocsCode<TD> = {
  example: {
    html: /*html*/`
      <div class="form">
        <div>
          <span>position</span>
          <select [(ngModel)]="position">
            <option value="before">before</option>
            <option value="after">after</option>
          </select>
        </div>

        <div>
          <span>orientation</span>
          <select [(ngModel)]="orientation">
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </div>

        <div>
          <span>sizingMode</span>
          <select [(ngModel)]="sizingMode">
            <option value="loose">loose</option>
            <option value="strict">strict</option>
            <option value="strict-origin">strict-origin</option>
            <option value="strict-target-point">strict-target-point</option>
          </select>
        </div>

        <label for="disabled">
          <input
            type="checkbox"
            id="disabled"
            [(ngModel)]="disabled"
          />
          disabled
        </label>

        <label for="observeContainer">
          <input
            type="checkbox"
            id="observeContainer"
            [(ngModel)]="observeContainer"
          />
          observeContainer
        </label>

        <label for="unobserveTarget">
          <input
            type="checkbox"
            id="unobserveTarget"
            [(ngModel)]="unobserveTarget"
          />
          unobserveTarget
        </label>
      </div>

      <div class="form">
        <button mlButton variant="raised" (click)="bigSize = !bigSize">Change item size</button>
        <button mlButton variant="raised" (click)="boldBorder = !boldBorder">Change border size</button>
      </div>

      <div class="prod">
        <div
          class="wrapper"
          [class]="orientation"
          [class.big-size]="bigSize"
          [class.bold-border]="boldBorder"
        >
          <ml-straight-tracker
            [targetIndex]="selectedIndex"
            [disabled]="disabled"
            [position]="position"
            [orientation]="orientation"
            [observeContainer]="observeContainer"
            [unobserveTarget]="unobserveTarget"
          >
            <div class="ink-bar"></div>
          </ml-straight-tracker>
          <div
            class="item" 
            *ngFor="let char of ['A', 'B', 'C']; let i = index;"
            (click)="selectedIndex = i"
          >
            Item {{ char }}
          </div>
        </div>
      </div>
    `,
    typescript: /*javascript*/`
      import { Component } from '@angular/core';
      import {
          MlStraightTrackerOrientation,
          MlStraightTrackerPosition,
          MlStraightTrackerSizingMode
      } from 'src/material-lite/cdk/straight-tracker';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.scss'],
        host: { class: 'docs-markdown' }
      })
      export class ExampleComponent {
        bigSize: boolean;
        boldBorder: boolean;
      
        disabled: boolean;
        observeContainer: boolean;
        unobserveTarget: boolean;
        selectedIndex: number = 0;
        orientation: MlStraightTrackerOrientation = 'horizontal';
        position: MlStraightTrackerPosition;
        sizingMode: MlStraightTrackerSizingMode;
      }
    `,
    scss: /*css*/`
      .wrapper {
        position: relative; /* Important style!!! */
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        &.horizontal {
          width: 100%;

          .item {
            border-left: 1px solid black;
            border-right: 1px solid black;
            padding: 8px;
          }
        
          &.big-size .item {
            height: 80px;
            width: 100%;
          }
        
          &.bold-border .item {
            border-left: 8px solid black;
            border-right: 8px solid black;
          }
        
          .ink-bar {
            height: 4px;
            background: #3F51B5;
          }
        }

        &.vertical {
          width: auto;

          .item {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            padding: 8px 40px;
          }
        
          &.big-size .item {
            padding: 36px 40px;
          }
        
          &.bold-border .item {
            border-top: 8px solid black;
            border-bottom: 8px solid black;
          }
        
          .ink-bar {
            width: 4px;
            background: #E91E63;
          }
        }
      }

      .ink-bar {
        position: relative;
      }

      .item {
        width: auto;
        text-align: center;
        font-weight: 500;
        padding: 8px 0;
        box-sizing: border-box;
    
        &:hover {
          background-color: rgba(0, 0, 0, 0.064);
        }
      }

      /** 見やすさのため */
      :host::ng-deep { 
        .ml-top-tracker .ink-bar {
          bottom: 8px;
        }
      
        .ml-bottom-tracker .ink-bar {
          top: 8px;
        }
      
        .ml-left-tracker .ink-bar {
          right: 8px;
        }
      
        .ml-right-tracker .ink-bar {
          left: 8px;
        }
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
  }
};
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  host: { class: 'docs-markdown' }
})
export class ExampleComponent {
  docsCode = DOCS_CODE;

  bigSize: boolean;
  boldBorder: boolean;

  disabled: boolean;
  observeContainer: boolean;
  unobserveTarget: boolean;
  selectedIndex: number = 0;
  orientation: MlStraightTrackerOrientation = 'horizontal';
  position: MlStraightTrackerPosition;
  sizingMode: MlStraightTrackerSizingMode;

  // toggleItemSize(): void {
  //   this._removeClassList('big-size');
  // }

  // toggleItemBorder(): void {
  //   this._removeClassList('bold-border');
  // }

  // _removeClassList(search: string): void {
  //   const classList = [...this.wrapperClassList];

  //   const index = classList.indexOf(className);

  //   index === -1
  //     ? classList.push(className)
  //     : classList.splice(index, 1);

  //   this.wrapperClassList = classList;
  // }
}
