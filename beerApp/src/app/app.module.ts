import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BreweryListComponent } from './brewery-list/brewery-list.component';
import {FormsModule} from "@angular/forms";
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BreweryListComponent,
    BreweryDetailComponent,
    BeerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
