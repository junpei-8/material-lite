import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MlButtonModule } from '@material-lite/angular/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsSidenavModule } from './components/docs-sidenav';
import { ConfigComponent } from './views/config/config.component';
import { HomeComponent } from './views/home/home.component';
import { MethodsComponent } from './views/methods/methods.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ThemingComponent } from './views/theming/theming.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ThemingComponent,
    ThemingComponent,
    ConfigComponent,
    MethodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MlButtonModule,
    DocsSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
