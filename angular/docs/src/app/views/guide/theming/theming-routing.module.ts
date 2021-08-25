import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent, YourOwnThemesComponent } from './pages';
import { ThemingComponent } from './theming.component';

const routes: Routes = [
  {
    path: '', component: ThemingComponent, children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'your-own-themes', component: YourOwnThemesComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemingRoutingModule { }
