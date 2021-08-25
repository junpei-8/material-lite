import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { ElevationStylesRoutingModule } from './elevation-styles-routing.module';

import { ElevationStylesComponent } from './elevation-styles.component';

@NgModule({
  declarations: [ElevationStylesComponent],
  imports: [
    ElevationStylesRoutingModule,
    DocsViewerModule,
    MlButtonModule,
  ]
})
export class ElevationStylesModule { }
