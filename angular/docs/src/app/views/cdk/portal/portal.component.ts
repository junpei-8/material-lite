import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styles: [`
    app-portal .prod {
      flex-direction: column;
    }

    .portal-outlet {
      min-width: 300px;
      min-height: 48px;
      padding: 8px;
      margin-top: 16px;
      border: 1px solid #000;
      text-align: center;
    }

    app-portal .portal-content {
      display: block;
      font-size: 20px;
      font-weight: bold;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-view' }
})
export class PortalComponent {
}
