import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Falsy } from '@material-lite/angular-cdk/utils';
export type MlCardVariant = 'raised' | 'stroked';

@Component({
  selector: 'ml-card',
  exportAs: 'mlCard',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ml-card',
    '[class]': '_variantClass'
    // '[class._ml-animlion-noopable]': '_animlionMode === 'NoopAnimlions'',
  }
})
export class MlCard {
  @Input('variant') set setVariant(variant: MlCardVariant | Falsy) {
    // @ts-ignore
    const result = this.variant = variant || 'raised';
    this._variantClass = 'ml-' + result + '-card';
  }
  readonly variant: MlCardVariant = 'raised';
  private _variantClass = 'ml-raised-card';
}
