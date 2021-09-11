import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'docs-view'}
})
export class CategoriesComponent {
}
