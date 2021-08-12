import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-view' }
})
export class SlideToggleComponent {
}
