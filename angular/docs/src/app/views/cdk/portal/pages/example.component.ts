import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MlPortal, MlPortalConfig, MlPortalContent } from '@material-lite/angular-cdk/portal';
import { DocsCode } from 'src/app/components/docs-viewer';
import { PortalContentComponent } from './content.components';

type TD = 'private' | 'public';
const DOCS_CODE: DocsCode<TD> = {
  private: {
    html: /*html*/`
      <div class="form">
        <button mlButton variant="raised" (click)="attachComponent()">Attach component</button>
        <button mlButton variant="raised" (click)="attachTemplate()">Attach template</button>
        <button mlButton variant="raised" (click)="attachDom()">Attach DOM</button>
        <button mlButton variant="raised" (click)="attachClonedDom()">Attach cloned DOM</button>
      </div>

      <div class="prod">
        <div class="portal-outlet">
          <ng-template
            [mlPortal]="content"
            [mlPortalConfig]="config"
          ></ng-template>
        </div>

        <ng-template #templateRef>
          <div class="portal-content">Template</div>
        </ng-template>

        <div class="portal-content" #domRef>DOM</div>

        <div class="portal-content" #clonedDomRef>Cloned DOM</div>
      </div>
    `,
    typescript: /*javascript*/`
      import { Component, HostBinding, TemplateRef, ElementRef } from '@angular/core';
      import { MlPortalContent, MlPortalAttachConfig, MlPortalAttachedRef } from '@material-lite/angular-cdk/portal';
      
      @Component({
        selector: 'app-example',
        templateUrl: './example.component.html',
        styleUrls: ['./example.component.scss']
      })
      export class ExampleComponent{
        @ViewChild('templateRef') templateRef: TemplateRef<HTMLElement>
        @ViewChild('domRef') domRef: ElementRef<HTMLElement>;
        @ViewChild('clonedDomRef') clonedDomRef: ElementRef<HTMLElement>;
      
        content: MlPortalContent | null;
        config: MlPortalAttachConfig = {};
      
        attachComponent() {
          this.content = PortalContentComponent;
        }
      
        attachTemplate() {
          this.content = this.templateRef.nativeElement;
        }
      
        attachDom() {
          this.config.cloneDOM = false;
          this.content = this.domRef.nativeElement;
        }
      
        attachClonedDom() {
          this.config.cloneDOM = true;
          this.content = this.clonedDomRef.nativeElement;
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
    scss: /*css*/`
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

  public: {
  }
};

DOCS_CODE.public.scss = DOCS_CODE.private.scss;

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  host: { class: 'docs-markdown' }
})
export class ExampleComponent {
  docsCode = DOCS_CODE;
  PortalContentComponent = PortalContentComponent;
  private = {
    content: null as MlPortalContent | null,
    config: {} as MlPortalConfig
  }

  @ViewChild('publicTemplateRef') publicTemplateRef: TemplateRef<HTMLElement>;
  @ViewChild('publicDomRef') publicDomRef: ElementRef<HTMLElement>;
  @ViewChild('publicClonedDomRef') publicClonedDomRef: ElementRef<HTMLElement>;

  constructor(
    private _mlPortal: MlPortal
  ) {}

  publicAttachComponent(): void {
    const ref = this._mlPortal.attach(PortalContentComponent, 'public');
    setTimeout(() => ref.detach(), 1600);
  }

  publicAttachTemplate(): void {
    const ref = this._mlPortal.attach(this.publicTemplateRef, 'public');
    setTimeout(() => ref.detach(), 1600);
  }

  publicAttachDom(): void {
    const dom = this.publicDomRef.nativeElement;
    const ref = this._mlPortal.attach(dom, 'public');
    setTimeout(() => ref.detach(), 1600);
  }

  publicAttachClonedDom(): void {
    const clonedDom = this.publicClonedDomRef.nativeElement;
    const ref = this._mlPortal.attach(clonedDom, 'public', { cloneDOM: true });
    setTimeout(() => ref.detach(), 1600);
  }
}
