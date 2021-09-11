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

    let route = state.routeConfig!.path!;

    if (route === '') {
      route = this.routes[0];
    }

    this.activatedRoute = route;
    this.activatedRouteIndex = this.routes.indexOf(route);
  }

  goToLink(route: string): void {
    const router = this._router;

    const pathList: string[] = router.url.split('/');

    const lastIndex= pathList.length - 1;
    if (pathList[lastIndex] !== route) {
      window.scrollTo({ top:0 });

      pathList[lastIndex] = route;

      const entryRoute = pathList.join('/');
  
      router.navigate([entryRoute]);

    } else {
      window.scrollTo({ top:0, behavior: 'smooth' });
    }
  }
}
