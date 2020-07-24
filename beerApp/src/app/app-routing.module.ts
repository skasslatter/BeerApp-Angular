import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component"
import {BreweryListComponent} from "./brewery-list/brewery-list.component"
import {BreweryDetailComponent} from "./brewery-detail/brewery-detail.component";
import {BeerDetailComponent} from "./beer-detail/beer-detail.component";
import {BeerListComponent} from "./beer-list/beer-list.component";


const routes: Routes = [
  //first: defines the URL path
  //second: defines the component Angular should use
  { path: '', component: HomepageComponent},
  { path: 'breweries', component: BreweryListComponent },
  { path: 'brewery-detail/:id', component: BreweryDetailComponent },
  { path: 'beer-detail/:id', component: BeerDetailComponent },
  { path: 'beers', component: BeerListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
