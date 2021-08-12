import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-view' }
})
export class ThemingComponent {
}
