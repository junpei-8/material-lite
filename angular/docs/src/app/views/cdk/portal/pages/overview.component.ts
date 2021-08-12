import { ChangeDetectorRef, Component } from '@angular/core';
import { MlPortal, MlPortalConfig, MlPortalContent } from '@material-lite/angular-cdk/portal';
import { DocsCode } from 'src/app/components/docs-viewer';
import { commonPortalCss, PortalContentComponent } from './content.components';

type TD = 'contentType' | 'privateOrPublic' | 'privateOutlet' | 'publicOutlet' | 'animations';
const DOCS_CODE: DocsCode<TD> = {
  contentType: {
    typescript: /*javascript*/`
      type MlPortalContent = Class<any> | TemplateRef<any> | Element;
    `
  },

  privateOrPublic: {
    html: /*html*/`
      <!-- Private outlet -->
      <ng-template [mlPortalOutlet]="exampleContent"></ng-template>
      
      <!-- Public outlet -->
      <ng-template mlPortalOutlet mlPortalOutletKey="uniqueKey"></ng-template>
    `
  },

  privateOutlet: {
    html: /*html*/`
    <button mlButton variant="raised" (click)="attach()">Attach</button>

    <div class="portal-outlet">
      <ng-template
        [mlPortal]="content"
        [mlPortalConfig]="config"
        (mlPortalAttach)="onAttach($event)"
      ></ng-template>
    </div>
    `,

    typescript: /*javascript*/`
      import { Component, HostBinding } from '@angular/core';
      import { MlPortalContent, MlPortalConfig, MlPortalPrivateAttachedRef } from '@material-lite/angular-cdk/portal';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.css']
      })
      export class ExampleComponent {
        content: MlPortalContent | null = null;
        config: MlPortalConfig = {};

        attach() {
          this.content = PortalContentComponent;
        }

        onAttach(event: MlPortalPrivateAttachedRef) {
          setTimeout(() => this.content = null, 3000);
        }
      }

      @Component({
        selector: 'app-portal-content-component',
        template: '<span>Component</span>',
      })
      export class PortalContentComponent {
        @HostBinding() class = 'portal-content';
      }
    `,

    css: commonPortalCss
  },

  publicOutlet: {
    html: /*html*/`
      <button mlButton variant="raised" (click)="attach()">Attach</button>
      
      <div class="portal-outlet">
        <ng-template mlPortal mlPortalKey="example"></ng-template>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component, HostBinding } from '@angular/core';
      import { MlPortal } from '@material-lite/angular-cdk/portal';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.css']
      })
      export class ExampleComponent {
        constructor(
          private _mlPortal: MlPortal
        ) {}

        attach() {
          const ref = this._mlPortal.attach(PortalContentComponent, 'example');
          setTimeout(() => ref.detach(), 3000);
        }
      }

      @Component({
        selector: 'app-portal-content-component',
        template: '<span>Component</span>',
      })
      export class PortalContentComponent {
        @HostBinding() class = 'portal-content';
      }
    `,

    css: commonPortalCss
  },

  animations: {
    html: /*html*/`
      <button mlButton variant="raised" (click)="attach()">Attach</button>
  
      <div class="portal-outlet">
        <ng-template mlPortal mlPortalKey="example"></ng-template>
      </div>
    `,

    typescript: /*javascript*/`
      import { Component, HostBinding } from '@angular/core';
      import { MlPortal } from '@material-lite/angular-cdk/portal';

      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.css']
      })
      export class ExampleComponent {
        config: MlPortalConfig = {
          animation: {
            className: 'example',
            enter: 400,
            leave: 400
          }
        }

        constructor(
          private _mlPortal: MlPortal
        ) {}

        attach() {
          const ref = this._mlPortal.attach(PortalContentComponent, 'example', this.config);
          setTimeout(() => ref.detach(), 3000);
        }
      }

      @Component({
        selector: 'app-portal-content-component',
        template: '<span>Component</span>',
      })
      export class PortalContentComponent {
        @HostBinding() class = 'portal-content';
      }
    `,

    css: /*css*/`
      :host::ng-deep .example-enter-active,
      :host::ng-deep .example-leave-active {
        transition: opacity .4s;
      }
      
      :host::ng-deep .example-enter-from,
      :host::ng-deep .example-leave-to {
        opacity: 0;
      }
    
      .portal-outlet {
        min-width: 300px;
        min-height: 48px;
        padding: 8px;
        margin: 8px 16px;
        border: 1px solid #000;
        text-align: center;
      }
    
      .portal-content {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }
    `,

    scss: /*css*/`
      :host::ng-deep {
        .example-enter-active,
        .example-leave-active {
          transition: opacity .4s;
        }

        .example-enter-from,
        .example-leave-to {
          opacity: 0;
        }
      }
    
      .portal-outlet {
        min-width: 300px;
        min-height: 48px;
        padding: 8px;
        margin: 8px 16px;
        border: 1px solid #000;
        text-align: center;
      }
    
      .portal-content {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }
    `,
  }
};
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styles: [`
    :host::ng-deep .example-enter-active,
    :host::ng-deep .example-leave-active {
      transition: opacity .4s;
    }
    
    :host::ng-deep .example-enter-from,
    :host::ng-deep .example-leave-to {
      opacity: 0;
    }
  `],
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;

  privateOutlet = {
    content: null as any,
    config: {} as MlPortalConfig,
    attach: () => this.attachPrivatePortal(this.privateOutlet, PortalContentComponent)
  }

  publicOutlet = {
    attach: () => {
      const ref = this._mlPortal.attach(PortalContentComponent, 'publicOutlet');
      setTimeout(() => ref.detach(), 3000);
    }
  }

  animations = {
    config: {
      animation: {
        className: 'example',
        enter: 400,
        leave: 400
      }
    } as MlPortalConfig,
    attach: () => {
      const ref = this._mlPortal.attach(PortalContentComponent, 'animations', this.animations.config);
      setTimeout(() => ref.detach(), 3000);
    }
  }

  constructor(
    private _mlPortal: MlPortal,
    private _changeDetector: ChangeDetectorRef
  ) {}

  attachPrivatePortal(ref: { content: any }, content: MlPortalContent): void {
    ref.content = content;
    setTimeout(() => {
      ref.content = null;
      this._changeDetector.markForCheck();
    }, 3000)
  }
}
