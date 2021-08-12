import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html',
  styles: [`
    :host {
      display: block;
      text-align: center;
      padding: 32px 0;
    }

    span {
      display: block;
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 32px;
    }
  `]
})
export class NotFoundComponent {
}
