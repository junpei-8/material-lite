import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { GettingStartedRoutingModule } from './getting-started-routing.module';

import { GettingStartedComponent } from './getting-started.component';

@NgModule({
  declarations: [GettingStartedComponent],
  imports: [
    GettingStartedRoutingModule,
    DocsViewerModule,
    DocsNavbarModule,
    MlButtonModule,
  ]
})
export class GettingStartedModule { }
