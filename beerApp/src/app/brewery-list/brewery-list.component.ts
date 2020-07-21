import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Country {
  displayName: String
}

interface Location {
  country: Country
}

interface Brewery {
  name: String,
  description: String,
  established: Number,
  images?: ImageSet,
  locations: Array<Location>,
}

interface ImageSet {
  medium: String,
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
  breweries: Array<Brewery>;
  filteredBreweries: Array<Brewery>;
  uniqueCountryNames: Array<String>;

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
        this.filteredBreweries = this.breweries
        console.log('response', response);
        this.getBreweriesLocations()
      });
  }

  getBreweriesLocations() {
    const locations: Array<Array<Location>> = this.breweries
      .filter((brewery) => {
        return brewery.locations !== null && brewery.locations !== undefined
      })
      .map((brewery) => {
        return brewery.locations
      })
    let flatLocations = []
    locations.forEach((locationArray) => {
      flatLocations = flatLocations.concat(locationArray)
    })
    const countryNames = flatLocations.map((location) => {
      return location.country.displayName;
    })
    let uniqueCountryNames = [...new Set(countryNames)]
    console.log("uniqueCountryNames", uniqueCountryNames)
    this.uniqueCountryNames = uniqueCountryNames
  }

  onCountryChange($event) {
    console.log("event target", $event.target.value)
    let selectedCountry = $event.target.value
    this.filterBreweriesByCountry(selectedCountry)
  }

  filterBreweriesByCountry(countryName) {
    if (!countryName) {
      return this.breweries
    }
    const filteredBreweries = this.breweries
      .filter((brewery) => {
        return brewery.locations !== null && brewery.locations !== undefined;
      })
      .filter((brewery) => {
        let hasLocation = false
        brewery.locations.forEach((location) => {
          if (location.country.displayName === countryName) {
            hasLocation = true
          }
        })
        return hasLocation
      });
    this.filteredBreweries = filteredBreweries
  }
}
