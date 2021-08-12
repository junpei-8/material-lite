import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { StraightTrackerComponent } from './straight-tracker.component';
import { StraightTrackerRoutingModule } from './straight-tracker-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';
import { MlStraightTrackerModule } from 'src/material-lite/cdk/straight-tracker';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StraightTrackerComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MlButtonModule,
    MlStraightTrackerModule,
    StraightTrackerRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class StraightTrackerModule { }
