import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-config',
  template: `
    <docs-sidenav>
      <a mlButton routerLink="/config/portal">Portal</a>
      <a mlButton routerLink="/config/straight-tracker">Straight tracker</a>
    </docs-sidenav>

    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'app-view'}
})
export class ConfigComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
