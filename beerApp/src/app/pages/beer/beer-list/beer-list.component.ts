import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";

import {Beer} from "../../../models/beer";
import {Item} from "../../../shared/filter-function/filter-function.component";

@Component({
    selector: 'app-beer-list',
    templateUrl: './beer-list.component.html',
    styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
    beers: Beer[] = [];
    filteredBeers: Beer[] = [];
    isLoading: boolean = true;
    pageCount: number = 0;
    beerTypes: Item[] = [];
    filteredType: string;
    errorMessage: string

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBeers(1)
        this.getBeerStyles()
    }

    getAllBeers(page: number) {
        this.isLoading = true
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.beers = response.data
            console.log("all beers response", this.beers)
            this.isLoading = false
            this.pageCount = response.numberOfPages
            this.filteredBeers = this.beers
        })
    }

    onPageSelected($event) {
        this.getAllBeers($event)
    }

    getBeerStyles() {
        this.apiService.getBeerStyles().subscribe((response) => {
            this.beerTypes = response
                .filter((style) => {
                    return style.shortName !== null && style.shortName !== undefined
                })
                .map((style) => {
                    return {name: style.shortName, id: style.id}
                })
            this.beerTypes.sort((a, b) => (a.name > b.name) ? 1 : -1)
        })
    }

    onTypeChange(value: string) {
        this.filterBeersByType(value)
    }

    filterBeersByType(selectedTypeId) {
        this.filteredType = selectedTypeId
        if (!selectedTypeId) {
            return this.beers
        }
        // this.isLoading = true
        this.apiService.getBeerByStyle(selectedTypeId).subscribe((response) => {
            this.pageCount = 0
            if (response === undefined) {
                console.log("no beer found")
                this.filteredBeers = []
                return this.errorMessage = "Sorry, no beer was found"
            }
            else {
                this.filteredBeers = response
                this.errorMessage = ""
            }

        })
    }
}
