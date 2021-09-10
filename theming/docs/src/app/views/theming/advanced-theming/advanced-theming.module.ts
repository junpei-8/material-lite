import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { AdvancedThemingRoutingModule } from './advanced-theming-routing.module';

import { AdvancedThemingComponent } from './advanced-theming.component';

@NgModule({
  declarations: [AdvancedThemingComponent],
  imports: [
    AdvancedThemingRoutingModule,
    DocsViewerModule,
    DocsNavbarModule,
    MlButtonModule,
  ]
})
export class AdvancedThemingModule { }
