import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TD = 'importing' | 'inputDirectives' | 'outputDirectives' | 'members' | 'mlPortal' | 'mlPortalAttachedRef' | 'interfaces';
const DOCS_CODE: DocsCode<TD> = {
  importing: {
    typescript: `import { MlPortalModule } from '@material-lite/angular-cdk/portal';`
  },

  inputDirectives: {
    typescript: /*javascript*/`
      type Falsy = false | undefined | null | '' | 0;

      /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
      @Input('mlPortal') content: MlPortalContent;
      @Input('mlPortalKey') key: string;
      @Input('mlPortalConfig') config: MlPortalConfig;
      @Input('mlPortalDestroyingDuration') destroyingDuration: number;
    `
  },

  outputDirectives: {
    typescript: /*javascript*/`
      @Output('mlPortalAttach') attachEmitter: EventEmitter<MlPortalPrivateAttachedRef>;
    `
  },

  members: {
    typescript: /*javascript*/`
      attachedRef: MlPortalPrivateAttachedRef;
      portalData: MlPortalData;
    `
  },

  mlPortal: {
    typescript: /*javascript*/`
      attach(content: MlPortalContent, keyOrPortalData: string | MlPortalData, config?: MlPortalConfig): MlPortalAttachedRef;
      detachAll(dataStorage: MlPortalDataStorage, ...keys[]): void;
      detachAllOfPortalData(portalData: MlPortalData): void;
      hasPortalData(key: string): boolean;
      setPortalData(key: string, portalData: MlPortalData): void;
    `
  },

  mlPortalAttachedRef: {
    typescript: /*javascript*/`
      hasClosed: boolean;

      data: {
        outletKey: string | null;
        attachedOrder: number;
        contentType: MlPortalContentType;
        outletElement: HTMLElement;
        rootContentElement: Element;
        isFirstAttached: boolean;
      };

      animationConfig: {
        className?: string;
        enter?: number;
        leave?: number;
        cancelOnAttach?: boolean;
        cancelOnDetach?: boolean;
      };

      detach(): void;

      lifecycle: {
        afterAttached(): NoCompleteObservable<void>;
        beforeDetached(): NoCompleteObservable<void>;
        afterDetached(): NoCompleteObservable<void>;
      };
    `  
  },

  interfaces: {
    typescript: /*javascript*/`
      type MlPortalContent = Class<any> | TemplateRef<any> | Element;
      type MlPortalContentType = 'component' | 'template' | 'DOM' | 'cloneDOM';

      type MlPortalPrivateAttachedRef = Omit<MlPortalAttachedRef, 'detach'>;

      interface MlPortalData {
        outletElement: HTMLElement;
        viewContainerRef: ViewContainerRef;
        detachEvents: ((outletDestroyed?: boolean) => void)[];
        destroyingOutletDuration?: number | Falsy;
      }
      type mlPortalDataStorage = Map<string, MlPortalData>;

      interface MlPortalConfig {
        animation?: {
          className?: string;
          enter?: number;
          leave?: number;
          cancelOnAttach?: boolean;
          cancelOnDetach?: boolean;
        };
      
        component?: {
          injectionData?: any;
          providers?: StaticProvider[];
          index?: number;
          ngContent?: any[][];
        };
      
        template?: {
          context?: {
            [key: string]: any
          };
          index?: number;
        };
      
        cloneDOM?: boolean;

        dataStorageRef?: MlPortalDataStorage;
      }
    `
  }
};
@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  host: { class: 'docs-reference' }
})
export class ReferenceComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
