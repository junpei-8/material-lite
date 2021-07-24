import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from 'src/material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';
import { ButtonRoutingModule } from './button-routing.module';

import { ButtonComponent } from './button.component';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';

@NgModule({
  declarations: [
    ButtonComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlButtonModule,
    ButtonRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class ButtonModule { }
