import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { MlStraightTrackerModule } from 'src/material-lite/cdk/straight-tracker';

import { DocsNavbarComponent } from './docs-navbar.component';

@NgModule({
  imports: [CommonModule, MlButtonModule, MlStraightTrackerModule],
  exports: [DocsNavbarComponent],
  declarations: [DocsNavbarComponent],
})
export class DocsNavbarModule { }
