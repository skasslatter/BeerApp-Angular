import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "src/services/api.service"
import {Brewery} from "../../../models/brewery";

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit {
    breweries: Brewery[] = [];
    filteredBreweries: Brewery[] = [];
    uniqueCountryNames: String[] = [];
    nameSearch: String;
    filteredCountry: String;
    loading: boolean = true;

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBreweries()
    }

    getAllBreweries() {
        this.apiService.getAllBreweries().subscribe((response) => {
            this.breweries = response
            this.filteredBreweries = this.breweries
            this.getBreweriesLocations()
            this.loading = false
        })
    }

    getBreweriesLocations() {
        const locations = this.breweries
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
        this.uniqueCountryNames = [...new Set(countryNames)]
    }

    onCountryChange(value) {
        this.filterBreweriesByCountry(value)
    }

    filterBreweriesByCountry(countryName) {
        this.nameSearch = ""
        this.filteredCountry = countryName
        if (!countryName) {
            return this.breweries
        }
        this.filteredBreweries = this.breweries
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
            })
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
