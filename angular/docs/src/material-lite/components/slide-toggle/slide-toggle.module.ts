import { NgModule } from '@angular/core';
import { MlSlideToggleRequiredValidator } from './slide-toggle-required-validator';
import { MlSlideToggle } from './slide-toggle.component';

// `Angular material`では、以下のようにModule化している
// @NgModule({
//   exports: [MlSlideToggleRequiredValidator],
//   declarations: [MlSlideToggleRequiredValidator],
// })
// export class MlSlideToggleRequiredValidatorModule {}

@NgModule({
  exports: [MlSlideToggle, MlSlideToggleRequiredValidator],
  declarations: [MlSlideToggle, MlSlideToggleRequiredValidator],
})
export class MlSlideToggleModule {}

