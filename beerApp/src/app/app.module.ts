import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {BreweryListComponent} from './pages/brewery/brewery-list/brewery-list.component';
import {FormsModule} from "@angular/forms";
import {BreweryDetailComponent} from './pages/brewery/brewery-detail/brewery-detail.component';
import {BeerDetailComponent} from './pages/beer/beer-detail/beer-detail.component';
import {BeerListComponent} from './pages/beer/beer-list/beer-list.component';


@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        BreweryListComponent,
        BreweryDetailComponent,
        BeerDetailComponent,
        BeerListComponent
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
export class AppModule {
}
