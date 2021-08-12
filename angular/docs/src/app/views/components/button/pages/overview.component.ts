import { Component } from '@angular/core';
import { DocsCode } from 'src/app/components/docs-viewer';


type TP = 'variants' | 'theming' | 'anchorButton' | 'disabledButton' | 'hoverAction' | 'rippleConfig';
const DOCS_CODE: DocsCode<TP> = {
  variants: {
    html: /*html*/`
      <button mlButton>Default</button>
      <button mlButton variant="basic">Basic</button>
      <button mlButton variant="raised">Raised</button>
      <button mlButton variant="stroked">Stroked</button>
      <button mlButton variant="flat">Flat</button>
      <button mlButton variant="icon"><svg>...(omitted)</svg></button>
      <button mlButton variant="fab"><svg>...(omitted)</svg></button>
    `
  },
  theming: {
    html: /*html*/`
      <button mlButton variant="basic" theme="primary">Basic</button>
      <button mlButton variant="raised" theme="accent">Raised</button>
      <button mlButton variant="stroked" theme="warn">Stroked</button>
      <button mlButton variant="flat" theme="primary">Flat</button>
      <button mlButton variant="icon" theme="accent"><svg>...(omitted)</svg></button>
      <button mlButton variant="fab" theme="warn"><svg>...(omitted)</svg></button>
    `
  },

  anchorButton: {
    html: /*html*/`
      <a mlButton href="https://www.google.com/" target="_blank">Anchor</a>

      <button mlButton wrappedAnchor>
        <a href="https://www.google.com/" target="_blank">Wrapped Anchor</a>
      </button>
    `
  },

  disabledButton: {
    html: /*html*/`
      <button mlButton [disabled]="true" variant="basic">Disabled</button>
      <button mlButton disabled variant="raised">Disabled</button>
      <button mlButton disabled variant="stroked">Disabled</button>
      <button mlButton disabled variant="icon"><svg>...(omitted)</svg></button>
      <button mlButton disabled variant="fab"><svg>...(omitted)</svg></button>
    `
  },

  hoverAction: {
    html: /*html*/`
      <button mlButton hoverAction="disabled">Disabled</button>
      <button mlButton variant="raised" hoverAction="enabled">Enabled</button>
    `
  },

  rippleConfig: {
    html: /*html*/`
      <button mlButton disableRipple>Disable Ripple</button>
      <button mlButton [rippleConfig]="{ overdrive: true }">Ripple Overdrive</button>
    `
  },
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  host: { class: 'docs-markdown' }
})
export class OverviewComponent {
  docsCode = DOCS_CODE;
  constructor() {}
}
