import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MlButtonModule } from '@material-lite/angular/button';
import { DocsViewerComponent } from './docs-viewer.component';

@NgModule({
  imports: [CommonModule, MlButtonModule],
  declarations: [DocsViewerComponent],
  exports: [DocsViewerComponent],
})
export class DocsViewerModule { }
