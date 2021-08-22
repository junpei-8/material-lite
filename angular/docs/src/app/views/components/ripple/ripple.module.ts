import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { RippleComponent } from './ripple.component';
import { RippleRoutingModule } from './ripple-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';
import { MlRippleModule } from '@material-lite/angular/core';

@NgModule({
  declarations: [
    RippleComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlRippleModule,
    MlButtonModule,
    RippleRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class RippleModule { }
