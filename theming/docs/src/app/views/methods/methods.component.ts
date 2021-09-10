import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-methods',
  template: `
    <docs-sidenav>
      <a mlButton routerLink="/methods/portal">Portal</a>
      <a mlButton routerLink="/methods/straight-tracker">Straight tracker</a>
    </docs-sidenav>

    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'app-view'}
})
export class MethodsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
