import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { MlCardModule } from '@material-lite/angular/card';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { DocsNavbarModule } from 'src/app/components/docs-navbar';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DocsNavbarModule,
    MlButtonModule,
    MlCardModule,
  ]
})
export class CategoriesModule { }
