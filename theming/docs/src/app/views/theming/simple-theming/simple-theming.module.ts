import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { SimpleThemingRoutingModule } from './simple-theming-routing.module';

import { SimpleThemingComponent } from './simple-theming.component';

@NgModule({
  declarations: [SimpleThemingComponent],
  imports: [
    SimpleThemingRoutingModule,
    DocsViewerModule,
    DocsNavbarModule,
    MlButtonModule,
  ]
})
export class SimpleThemingModule { }
