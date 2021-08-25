import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuplicateStylesComponent } from './duplicate-styles.component';

const routes: Routes = [
  { path: '', component: DuplicateStylesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuplicateStylesRoutingModule { }
