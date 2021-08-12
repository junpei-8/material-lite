import { Component, ViewEncapsulation } from '@angular/core';

import { VERSION } from '@material-lite/angular-cdk/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'docs';
  version = VERSION;

  darkTheme: boolean;

  constructor() {
    // _mlTheming.initialize([{
    //   theme: ML_CSS_VARIABLE_THEME,
    //   palette: ML_CSS_VARIABLE_PALETTE
    // }]);
    // _mlTheming.setCssVariables(ML_LIGHT_THEME, ML_INDIGO_PINK_PALETTE)
  }

  toggleDarkTheme(): void {
    // const is = this.darkTheme = !this.darkTheme;
    // const theme = is
    //   ? ML_DARK_THEME
    //   : ML_LIGHT_THEME;

    // this._mlTheming.setCssVariables(theme, ML_INDIGO_PINK_PALETTE);
  }
}
