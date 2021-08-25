import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { DuplicateStylesRoutingModule } from './duplicate-styles-routing.module';

import { DuplicateStylesComponent } from './duplicate-styles.component';

@NgModule({
  declarations: [DuplicateStylesComponent],
  imports: [
    DuplicateStylesRoutingModule,
    DocsViewerModule,
    MlButtonModule,
  ]
})
export class DuplicateStylesModule { }
