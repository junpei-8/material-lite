import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from 'src/material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';
import { MlPortalModule } from 'src/material-lite/angular-cdk/portal';

@NgModule({
  declarations: [
    PortalComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlButtonModule,
    MlPortalModule,
    PortalRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class PortalModule { }
