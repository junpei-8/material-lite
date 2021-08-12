import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsViewerModule } from 'src/app/components/docs-viewer';
import { MlCardModule } from 'src/material-lite/components/card';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DocsViewerModule,
    MlButtonModule,
    MlCardModule,
  ]
})
export class CategoriesModule { }
