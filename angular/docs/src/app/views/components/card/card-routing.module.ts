import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { ExampleComponent, OverviewComponent, ReferenceComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: CardComponent, children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'reference', component: ReferenceComponent },
      { path: 'example', component: ExampleComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
