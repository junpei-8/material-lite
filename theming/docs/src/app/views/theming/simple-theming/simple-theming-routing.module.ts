import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleThemingComponent } from './simple-theming.component';

const routes: Routes = [
  { path: '', component: SimpleThemingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleThemingRoutingModule { }
