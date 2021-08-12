import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";

export const commonPortalCss = /*css*/`
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
`

@Component({
  selector: 'app-portal-content-component',
  template: '<span>Component</span>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalContentComponent {
  @HostBinding() class = 'portal-content';
}
