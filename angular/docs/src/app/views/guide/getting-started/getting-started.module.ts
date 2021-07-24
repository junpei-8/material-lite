import { NgModule } from '@angular/core';
import { MlButtonModule } from 'src/material-lite/angular/button';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { GettingStartedRoutingModule } from './getting-started-routing.module';

import { GettingStartedComponent } from './getting-started.component';

@NgModule({
  declarations: [GettingStartedComponent],
  imports: [
    GettingStartedRoutingModule,
    DocsViewerModule,
    MlButtonModule,
  ]
})
export class GettingStartedModule { }
