import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver, Inject, Injectable, Injector,
  StaticProvider, TemplateRef, ViewContainerRef
} from '@angular/core';
import { Class, Falsy, MlDocument, ML_DATA, ML_REF, RunOutsideNgZone, RUN_OUTSIDE_NG_ZONE } from '@material-lite/angular-cdk/utils';
import { MlPortalAttachedRef } from './portal-attached-ref';

export type MlPortalContent = Class<any> | TemplateRef<any> | Element;
export type MlPortalContentType = 'component' | 'template' | 'DOM' | 'cloneDOM';

export interface MlPortalConfig {
  dataStorageRef?: MlPortalDataStorage;

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
    // ngModuleFactory?: NgModuleFactory<any>
  };

  template?: {
    context?: {
      [key: string]: any
    };
    index?: number;
  };

  cloneDOM?: boolean;
}

export interface MlPortalData {
  outletElement: HTMLElement;
  viewContainerRef: ViewContainerRef;
  detachEvents: ((outletDestroyed?: boolean) => void)[];
  destroyingOutletDuration?: number | Falsy;
}

export interface MlPortalContentRef {
  rootElement: Element;
  destroy: () => void;
}

export type MlPortalDataStorage = Map<string, MlPortalData>;

@Injectable({
  providedIn: 'root'
})
export class MlPortal {
  private _createComment: MlDocument['createComment'];
  private _portalDataStorage: MlPortalDataStorage = new Map();

  constructor(
    @Inject(DOCUMENT) _document: MlDocument,
    @Inject(RUN_OUTSIDE_NG_ZONE) private _runOutsideNgZone: RunOutsideNgZone,
    private _injector: Injector,
  ) {
    this._createComment = _document.createComment.bind(_document);
  }

  hasPortalData(key: string): boolean {
    return this._portalDataStorage.has(key);
  }

  setPortalData(key: string, data: MlPortalData): void {
    this._portalDataStorage.set(key, data);
  }

  /**
   * ?????????????????????????????????????????????????????????????????????????????????
   *
   * @param content ?????????????????????
   * @param keyOrPortalData ?????????????????????????????????????????????????????????????????????
   */
  attach(content: MlPortalContent, keyOrPortalData: string | MlPortalData, config: MlPortalConfig = {} as any): MlPortalAttachedRef {
    let key: string | null;
    let portalData: MlPortalData;

    if (typeof keyOrPortalData === 'string') {
      key = keyOrPortalData;
      portalData = (config.dataStorageRef || this._portalDataStorage).get(keyOrPortalData)!;

      if (!portalData) {
        throw new Error(`
          "MlPortalOutlet.attach()"??????2????????????????????????????????????"portalData"???????????????????????????????????????????????????

          1. "MlPortalOutlet(service) > attach(...)"?????????????????????????????????
          2. "[mlPortalOutlet](directive) > [mlPortalOutlet](@Input)"??????????????????????????????
        `);
      }
    } else {
      key = null;
      portalData = keyOrPortalData;
    }

    const attachedOrder = portalData.detachEvents.length;

    if (typeof content === 'function') {
      // content = "component"
      const compConf = config.component || {};
      const vcRef = portalData.viewContainerRef;

      const contentRef: MlPortalContentRef = {} as any;

      const attachedRef =
        new MlPortalAttachedRef(
          'component', key, attachedOrder, config.animation,
          contentRef, portalData, this._runOutsideNgZone
        );

      const providers: StaticProvider[] = [
        { provide: ML_REF, useValue: attachedRef },
        { provide: ML_DATA, useValue: compConf.injectionData }
      ];

      if (compConf.providers) {
        providers.push(...compConf.providers);
      }

      const elInjector = Injector.create({ providers, parent: this._injector });
      const compResolver = elInjector.get(ComponentFactoryResolver);

      // const index = compConf.index || vcRef.length;
      const ref =
        vcRef.createComponent(
          compResolver.resolveComponentFactory(content), compConf.index,
          elInjector, compConf.ngContent
        );

      contentRef.rootElement = ref.location.nativeElement;
      contentRef.destroy = () => {
        ref.destroy();
        ref.changeDetectorRef.detectChanges();
      };

      // @ts-ignore
      return attachedRef._initialize();


    } else if (content instanceof TemplateRef) {
      // content = "template"
      const tempConf = config.template;
      const vcRef = portalData.viewContainerRef;

      // const index = compConf.index || vcRef.length;
      const ref = (tempConf)
        ? vcRef.createEmbeddedView(content, tempConf, tempConf.index)
        : vcRef.createEmbeddedView(content);

      const contentRef: MlPortalContentRef = {
        rootElement: ref.rootNodes[0],
        destroy: () => {
          ref.destroy();
          ref.detectChanges();
        }
      };

      return new MlPortalAttachedRef(
        'template', key, attachedOrder, config.animation,
        contentRef, portalData, this._runOutsideNgZone // @ts-ignore
      )._initialize();


    } else {
      // content = "DOM"
      let contentRef: MlPortalContentRef;

      let contentType: 'DOM' | 'cloneDOM';

      if (config.cloneDOM) {
        const clone = content.cloneNode(true) as HTMLElement;

        contentType = 'cloneDOM';

        const outletEl = portalData.outletElement;

        contentRef = {
          rootElement: clone,
          destroy: () => clone.remove() // clone??????DOM?????????
        };

        outletEl.appendChild(clone);


      } else {
        const prevMlPortalAttachedRef = // @ts-ignore
          content.mlPortalAttachedRef as MlPortalAttachedRef | undefined;

        if (prevMlPortalAttachedRef) {
          // @ts-expect-error: Assign to readonly variable
          prevMlPortalAttachedRef.data.isFirstAttached = false;
          return prevMlPortalAttachedRef;
        }

        contentType = 'DOM';

        const shadowWarrior = this._createComment('portal-container');
        const parentEl = content.parentElement;

        if (parentEl) {
          contentRef = {
            rootElement: content,
            destroy: () => parentEl.replaceChild(content, shadowWarrior) // ???????????????DOM???????????????????????????
          };

          // ??????????????????????????????????????????
          parentEl.replaceChild(shadowWarrior, content);
          portalData.outletElement.appendChild(content);

        } else {
          contentRef = {
            rootElement: content,
            destroy: () => content.remove()
          };

          portalData.outletElement.appendChild(content);
        }
      }

      const currMlPortalAttachedRef =  new MlPortalAttachedRef(
        contentType, key, attachedOrder, config.animation, contentRef,
        portalData, this._runOutsideNgZone // @ts-ignore
      )._initialize();

      // @ts-ignore
      content.mlPortalAttachedRef = currMlPortalAttachedRef;

      return currMlPortalAttachedRef;
    }
  }


  /**
   * @param dataStorage ???????????????`dataStorage`???????????????????????????????????????`dataStorage`?????????????????????
   * @param keys ???????????????`portalData`???`key`??????????????????????????????????????????????????????
   */
  detachAll(dataStorage: MlPortalDataStorage = this._portalDataStorage, ...keys: string[]): void {
    const len = keys.length;

    if (len) {
      for (let i = 0; i < len; i++) {
        const data = dataStorage.get(keys[i]);
        if (!data) { return; }
        this.detachAllOfPortalData(data);
      }

    } else {
      dataStorage.forEach((d) => this.detachAllOfPortalData(d));
    }
  }


  /**
   * PortalData???????????????????????????????????????
   */
  detachAllOfPortalData(portalData: MlPortalData): void {
    const detaches = portalData.detachEvents;
    const len = detaches.length;

    for (let i = 0; i < len; i++) {
      detaches[i]();
    }
  }
}
