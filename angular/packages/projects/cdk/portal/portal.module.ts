import { NgModule } from '@angular/core';
import { MlPortalOutlet } from './portal-outlet.directive';

@NgModule({
  declarations: [MlPortalOutlet],
  exports: [MlPortalOutlet],
})
export class MlPortalModule { }
