import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cdk',
  templateUrl: './cdk.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'app-view'}
})
export class CdkComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
