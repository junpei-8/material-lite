import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { VERSION } from '@material-lite/angular-cdk/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'docs';
  version = VERSION;

  isDarkTheme: boolean = true;

  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.toggleDarkTheme();
  }

  toggleDarkTheme(): void {
    const isDark = this.isDarkTheme = !this.isDarkTheme;
    isDark
      ? this._document.body.classList.add('dark-theme')
      : this._document.body.classList.remove('dark-theme');
  }
}
