import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-view' }
})
export class CardComponent {
}
