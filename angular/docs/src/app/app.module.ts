import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MlButtonModule } from '@material-lite/angular/button';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DocsSidenavModule } from './components/docs-sidenav';
import { CdkComponent } from './views/cdk/cdk.component';
import { ComponentsComponent } from './views/components/components.component';
import { GuideComponent } from './views/guide/guide.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ComponentsComponent,
    CdkComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    DocsSidenavModule,
    AppRoutingModule,
    MlButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
