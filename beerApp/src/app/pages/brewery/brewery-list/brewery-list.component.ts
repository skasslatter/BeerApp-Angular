import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from 'src/services/api/api.service';
import {SearchService} from 'src/services/search/search.service';


import {Brewery} from '../../../models/brewery/brewery';
import {Item} from '../../../components/filter-function/filter-function.component';

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit {
    breweries: Brewery[] = [];
    filteredBreweries: Brewery[] = [];
    uniqueCountryNames: Item[] = [];
    nameSearch: string;
    filteredCountry: string;
    isLoading = true;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private searchService: SearchService,
    ) {
    }

    ngOnInit(): void {
        this.getAllBreweries();
    }

    getAllBreweries(): void {
        this.apiService.getAllBreweries().subscribe((response) => {
            this.breweries = response;
            this.filteredBreweries = this.breweries;
            this.getBreweriesLocations();
            this.isLoading = false;
        });
    }

    getBreweriesLocations(): void {
        const locations = this.breweries
            .filter((brewery) => {
                return brewery.locations !== null && brewery.locations !== undefined;
            })
            .map((brewery) => {
                return brewery.locations;
            });
        let flatLocations = [];
        locations.forEach((locationArray) => {
            flatLocations = flatLocations.concat(locationArray);
        });
        const countryNames = flatLocations.map((location) => {
            return location.country.displayName;
        });
        const unique = [...new Set(countryNames)];
        this.uniqueCountryNames = unique.map((countryName) => {
            return {id: countryName, name: countryName};
        });
        this.uniqueCountryNames.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    onCountryChange(value): void {
        this.filterBreweriesByCountry(value);
    }

    filterBreweriesByCountry(countryName): Brewery[] {
        this.nameSearch = '';
        this.filteredCountry = countryName;
        if (!countryName) {
            return this.breweries;
        }
        this.filteredBreweries = this.breweries
            .filter((brewery) => {
                return brewery.locations !== null && brewery.locations !== undefined;
            })
            .filter((brewery) => {
                let hasLocation = false;
                brewery.locations.forEach((location) => {
                    if (location.country.displayName === countryName) {
                        hasLocation = true;
                    }
                });
                return hasLocation;
            });
    }

    searchByName(value): any {
        this.filteredBreweries = this.breweries;
        this.filteredCountry = '';
        this.nameSearch = value;
        this.filteredBreweries =  this.searchService.searchByValue(value, this.breweries);
    }

    clearFilters(): void {
        this.nameSearch = '';
        this.filteredCountry = '';
        this.filteredBreweries = this.breweries;
    }
}
