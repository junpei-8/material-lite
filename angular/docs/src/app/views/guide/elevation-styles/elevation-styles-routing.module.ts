import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElevationStylesComponent } from './elevation-styles.component';

const routes: Routes = [
  { path: '', component: ElevationStylesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevationStylesRoutingModule { }
