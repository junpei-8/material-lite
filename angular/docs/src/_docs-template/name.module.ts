import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { NAMEComponent } from './name.component';
import { NAMERoutingModule } from './name-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';

@NgModule({
  declarations: [
    NAMEComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlButtonModule,
    NAMERoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class NAMEModule { }
