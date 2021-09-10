import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { OverviewRoutingModule } from './overview-routing.module';

import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    OverviewRoutingModule,
    DocsViewerModule,
    DocsNavbarModule,
    MlButtonModule,
  ]
})
export class OverviewModule { }
