import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";

import { Brewery } from "../models/brewery";
import { Beer } from "../models/beer";

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
  breweryApiData: Array<Beer>;
  filteredBeers: Array<Beer>
  breweryInfo: Brewery;
  loading: boolean = true;
  nameSearch: String = ""
  uniqueBeerTypes: Array<String>
  filteredType: String = "";
  private routeSub: Subscription;

  constructor
  (private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let selectedBreweryID = params.id
      this.getBreweryInformation(selectedBreweryID)
    });
  }

  getBreweryInformation(id: number) {
    this.apiService.getBreweryInformation(id).subscribe((response) => {
      console.log("Brewery details response", response)
      this.breweryApiData = response
      this.filteredBeers = response
      this.breweryInfo = this.breweryApiData[0].breweries[0]
      this.loading = false
      this.getBeerTypes()
    })
  }

  searchByName(value: string) {
    this.filteredType = ""
    this.nameSearch = value
    this.filteredBeers = this.breweryApiData
    const searchTerm = value.toLowerCase()
    const filteredBeers = this.breweryApiData
      .filter((beer) => {
        return beer.name.toLowerCase().indexOf(searchTerm) !== -1
      })
    console.log("filteredBeers", filteredBeers)
    this.filteredBeers = filteredBeers
  }

  getBeerTypes() {
    const styles = this.breweryApiData
      .filter((beer) => {
        return beer.style !== null && beer.style !== undefined
      })
      .map((beer) => {
        return beer.style
      })
    const types = styles.map((style) => {
      return style.shortName
    })
    let uniqueBeerTypes = [...new Set(types)].sort()
    this.uniqueBeerTypes = uniqueBeerTypes
  }

  onTypeChange(value: string) {
    let selectedBeerType = value
    this.filterBeersByType(selectedBeerType)
  }

  filterBeersByType(selectedType: string) {
    this.nameSearch = ""
    this.filteredType = selectedType
    if (!selectedType) {
      return this.breweryApiData
    }
    const filteredBeers = this.breweryApiData
      .filter((beer) => {
        return beer.style !== null && beer.style !== undefined;
      })
      .filter((beer) => {
        return beer.style.shortName === selectedType
      })
    this.filteredBeers = filteredBeers
  }

  showAllBeers() {
    this.nameSearch = "";
    this.filteredType = "";
    this.filteredBeers = this.breweryApiData
  }
}
