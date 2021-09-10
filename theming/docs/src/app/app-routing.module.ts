import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './views/config/config.component';
import { HomeComponent } from './views/home/home.component';
import { MethodsComponent } from './views/methods/methods.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ThemingComponent } from './views/theming/theming.component';

const routes: Routes = [
  {
    path: 'theming', component: ThemingComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadChildren: () => import('./views/theming/overview').then(m => m.OverviewModule) },
      { path: 'advanced-theming', loadChildren: () => import('./views/theming/advanced-theming').then(m => m.AdvancedThemingModule) },
      { path: 'simple-theming', loadChildren: () => import('./views/theming/simple-theming').then(m => m.SimpleThemingModule) }
    ]
  },
  {
    path: 'config', component: ConfigComponent,
    children: [
    ]
  },
  {
    path: 'methods', component: MethodsComponent,
    children: [
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
