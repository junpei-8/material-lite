import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedThemingComponent } from './advanced-theming.component';

const routes: Routes = [
  { path: '', component: AdvancedThemingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedThemingRoutingModule { }
