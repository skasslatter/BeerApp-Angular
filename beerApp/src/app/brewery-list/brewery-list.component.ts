import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Brewery {
  name: String,
  description: String,
  established: Number,
  images?: ImageSet,
}

interface ImageSet {
  medium: string,
}

interface ApiBreweriesResponse {
  data: Array<Brewery>
}

@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit {
  breweries: Array<Brewery>

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getAllBreweries()
  }

  getAllBreweries() {
    let obs = this.http.get("/api/breweries?withLocations=Y")
    obs.subscribe(
      (response: ApiBreweriesResponse) => {
        this.breweries = response.data
        console.log('response', response);
      });
  }
}
