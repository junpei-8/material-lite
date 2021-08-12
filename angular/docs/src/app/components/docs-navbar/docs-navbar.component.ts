import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { YoungestRoute } from 'src/app/services/route';

@Component({
  selector: 'docs-navbar',
  templateUrl: './docs-navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'docs-navbar'
  }
})
export class DocsNavbarComponent implements OnInit, OnDestroy {
  @Input() routes: string[] = ['overview', 'reference', 'example'];
  @Input() routeNames: string[] = ['Overview', 'Reference', 'Example']

  activatedRoute: string;
  activatedRouteIndex: number;

  private _subscription: Subscription;

  constructor(
    private _router: Router,
    private _youngestRoute: YoungestRoute
  ) {}

  ngOnInit(): void {
    this.onChangeRoute();
    this._subscription =
      this._youngestRoute.routeChanges.subscribe(this.onChangeRoute.bind(this));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onChangeRoute(): void {
    const state = this._youngestRoute.state;

    const currRoute = this.activatedRoute = state.routeConfig!.path!;
    this.activatedRouteIndex = this.routes.indexOf(currRoute);
  }

  goToLink(route: string): void {
    window.scrollTo({top:0});
    const router = this._router;

    const urlArr: string[] = router.url.split('/');
    urlArr[urlArr.length - 1] = route;

    const entryRoute = urlArr.join('/');

    router.navigate([entryRoute]);
  }
}
