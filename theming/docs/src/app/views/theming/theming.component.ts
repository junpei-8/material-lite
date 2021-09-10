import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-theming',
  template: `
    <docs-sidenav>
      <a mlButton routerLink="/theming/overview">Overview</a>
      <a mlButton routerLink="/theming/advanced-theming">Advanced theming</a>
      <a mlButton routerLink="/theming/simple-theming">Simple theming</a>
    </docs-sidenav>

    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'app-view'}
})
export class ThemingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
