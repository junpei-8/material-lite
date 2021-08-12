import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';

type TP = 'importing' | 'inputDirectives' | 'members' | 'mlRippleCore';
const DOCS_CODE: DocsCode<TP> = {
  importing: {
    typescript: `import { MlRippleModule } from '@material-lite/angular/core';`
  },

  inputDirectives: {
    typescript: /*javascript*/`
      type Falsy = false | undefined | null | '' | 0;

      type MlRippleOverdrive = boolean | {
        width?: number,
        height?: number
      };
      type MlRippleAnimation = {
        enter?: number,
        leave?: number
      }
      type MlRippleEntrance = 'default' | 'center' | 'resonance';

      /* 以下の"@Input"プロパティーには"Falsy"が付与されています */
      @Input('mlRipple') /* none */
      @Input('mlRippleTrigger') /* none */: EventTarget | 'outlet';
      @Input('mlRippleDisabled') disabled: boolean;
      @input('mlRippleOpacity') opacity: number;
      @Input('mlRippleRadius') radius: number;
      @Input('mlRippleColor') color: string;
      @Input('mlRippleTheme') theme: string;
      @Input('mlRippleEntrance') entrance: MlRippleEntrance;
      @Input('mlRippleFadeOutEvents') fadeOutEvents: string[];
      @Input('mlRippleAnimation') animation: MlRippleAnimation;
      @Input('mlRippleOverdrive') overdrive: MlRippleOverdrive;
    `
  },

  members: {
    typescript: /*javascript*/`
      trigger: EventTarget | null;
      core: MlRippleCore;
    `
  },

  mlRippleCore: {
    typescript: /*javascript*/`
      activeRippleSize: number;

      setup(): void;
      teardown(): void;
  
      presetTrigger(trigger: EventTarget): void;
      addTrigger(trigger: EventTarget): (() => void);
      getRemoveTriggerEvent(trigger: EventTarget): (() => void) | undefined;
      removeAllTrigger(): void;

      interface MlRippleElement extends HTMLElement {
        mlRippleEnterDuration: number;
      }
      fadeInRipple(): MlRippleElement;
      fadeOutRipple(rippleEl: MlRippleElement): void;
      autoFadeOutRipple(rippleEl: MlRippleElement): void;
    `
  }
}

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  host: { class: 'docs-reference' }
})
export class ReferenceComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
