import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'docs-sidenav',
  templateUrl: './docs-sidenav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'docs-sidenav'
  }
})
export class DocsSidenavComponent {
  @HostBinding('class.opened') hasOpenedDrawer: boolean;

  constructor() { }
}
