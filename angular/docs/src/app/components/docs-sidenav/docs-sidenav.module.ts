import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from 'src/material-lite/angular/button';
import { DocsSidenavComponent } from './docs-sidenav.component';

@NgModule({
  imports: [CommonModule, MlButtonModule],
  declarations: [DocsSidenavComponent],
  exports: [DocsSidenavComponent],
})
export class DocsSidenavModule { }
