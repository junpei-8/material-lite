import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { SlideToggleComponent } from './slide-toggle.component';
import { SlideToggleRoutingModule } from './slide-toggle-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';
import { MlSlideToggleModule } from '@material-lite/angular/slide-toggle';

@NgModule({
  declarations: [
    SlideToggleComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlButtonModule,
    MlSlideToggleModule,
    SlideToggleRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class SlideToggleModule { }
