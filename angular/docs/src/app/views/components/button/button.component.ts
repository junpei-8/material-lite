import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-view' }
})
export class ButtonComponent {
}
