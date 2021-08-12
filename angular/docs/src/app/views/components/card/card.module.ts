import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';
import { DocsViewerModule } from 'src/app/components/docs-viewer/docs-viewer.module';

import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';
import { MlCardModule } from 'src/material-lite/components/card';
import { MlCardContentsModule } from 'src/material-lite/components/card-contents';

@NgModule({
  declarations: [
    CardComponent,
    ExampleComponent,
    OverviewComponent,
    ReferenceComponent
  ],
  imports: [
    FormsModule,
    MlButtonModule,
    MlCardModule,
    MlCardContentsModule,
    CardRoutingModule,
    DocsViewerModule,
    DocsNavbarModule
  ]
})
export class CardModule { }
