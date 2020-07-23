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
  id: String,
  locations: Array<Location>,
}

interface ImageSet {
  medium: String,
  large: String,
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
  nameSearch: String = "";
  filteredCountry: String = "";
  loading: boolean = true;

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
        this.loading = false
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
    this.uniqueCountryNames = uniqueCountryNames
  }

  onCountryChange(value) {
    let selectedCountry = value
    this.filterBreweriesByCountry(selectedCountry)
  }

  filterBreweriesByCountry(countryName) {
    this.nameSearch = ""
    this.filteredCountry = countryName
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

  searchByName(value) {
    this.filteredCountry = ""
    this.nameSearch = value
    this.filteredBreweries = this.breweries
    const searchTerm = value.toLowerCase()
    const filteredBreweries = this.breweries
      .filter((brewery) => {
        return brewery.name.toLowerCase().indexOf(searchTerm) !== -1
      })
    console.log("filteredBreweries", filteredBreweries)
    this.filteredBreweries = filteredBreweries
  }

  showAllBreweries() {
    this.nameSearch = "";
    this.filteredCountry = ""
    this.filteredBreweries = this.breweries
  }
}