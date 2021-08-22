import { NgModule } from '@angular/core';
import {
  MlCardActions,
  MlCardAvatar,
  MlCardContent,
  MlCardFooter,
  MlCardHeader,
  MlCardImage,
  MlCardSubtitle,
  MlCardTitle
} from './card-contents.component';

@NgModule({
  declarations: [
    MlCardActions,
    MlCardAvatar,
    MlCardContent,
    MlCardFooter,
    MlCardHeader,
    MlCardImage,
    MlCardSubtitle,
    MlCardTitle
  ],
  exports: [
    MlCardActions,
    MlCardAvatar,
    MlCardContent,
    MlCardFooter,
    MlCardHeader,
    MlCardImage,
    MlCardSubtitle,
    MlCardTitle
  ]
})
export class MlCardContentsModule {}