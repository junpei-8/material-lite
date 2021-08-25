import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { OverviewComponent, YourOwnThemesComponent } from './pages';
import { ThemingRoutingModule } from './theming-routing.module';

import { ThemingComponent } from './theming.component';

@NgModule({
  declarations: [
    ThemingComponent,
    OverviewComponent,
    YourOwnThemesComponent
  ],
  imports: [
    ThemingRoutingModule,
    DocsViewerModule,
    DocsNavbarModule,
    MlButtonModule,
  ]
})
export class ThemingModule {}
