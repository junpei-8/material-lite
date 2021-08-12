import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScssComponent, TypescriptComponent } from './pages';
import { ThemingComponent } from './theming.component';

const routes: Routes = [
  {
    path: '', component: ThemingComponent, children: [
      { path: 'typescript', component: TypescriptComponent },
      { path: 'scss', component: ScssComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemingRoutingModule { }
