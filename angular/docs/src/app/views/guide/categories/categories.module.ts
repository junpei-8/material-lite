import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from 'src/material-lite/angular/button';
import { MlCardModule } from 'src/material-lite/angular/card';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MlButtonModule,
    MlCardModule,
  ]
})
export class CategoriesModule { }
