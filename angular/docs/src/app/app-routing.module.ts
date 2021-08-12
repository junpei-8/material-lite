import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdkComponent } from './views/cdk/cdk.component';
import { ComponentsComponent } from './views/components/components.component';
import { GuideComponent } from './views/guide/guide.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'components', component: ComponentsComponent,
    children: [
      { path: 'categories', loadChildren: () => import('./views/components/categories').then(m => m.CategoriesModule) },
      { path: 'button', loadChildren: () => import('./views/components/button').then(m => m.ButtonModule) },
      { path: 'card', loadChildren: () => import('./views/components/card').then(m => m.CardModule) },
      { path: 'ripple', loadChildren: () => import('./views/components/ripple').then(m => m.RippleModule) },
      { path: 'slide-toggle', loadChildren: () => import('./views/components/slide-toggle').then(m => m.SlideToggleModule) }
    ]
  },
  {
    path: 'cdk', component: CdkComponent,
    children: [
      { path: 'categories', loadChildren: () => import('./views/cdk/categories').then(m => m.CategoriesModule) },
      { path: 'portal', loadChildren: () => import('./views/cdk/portal').then(m => m.PortalModule) },
      { path: 'straight-tracker', loadChildren: () => import('./views/cdk/straight-tracker').then(m => m.StraightTrackerModule) }
    ]
  },
  {
    path: 'guide', component: GuideComponent,
    children: [
      { path: 'categories', loadChildren: () => import('./views/guide/categories').then(m => m.CategoriesModule) },
      { path: 'getting-started', loadChildren: () => import('./views/guide/getting-started').then(m => m.GettingStartedModule) },
      { path: 'theming', loadChildren: () => import('./views/guide/theming').then(m => m.ThemingModule)}
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollOffset: [0, 56],
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
