import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";

import {Beer} from "../../../models/beer";

@Component({
    selector: 'app-beer-list',
    templateUrl: './beer-list.component.html',
    styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
    beers: Beer[] = [];
    filteredBeers: Beer[] = [];
    isLoading: boolean = true;
    pageCount: number;
    beerTypes: any
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
            console.log("response",response)
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
        console.log("yyy", value)
        this.filterBeersByType(value)
    }

    // filterBeersByType(selectedType: string) {
    //     this.filteredType = selectedType
    //     if (!selectedType) {
    //         return this.beers
    //     }
    //     this.filteredBeers = this.beers
    //         .filter((beer) => {
    //             return beer.style !== null && beer.style !== undefined;
    //         })
    //         .filter((beer) => {
    //             return beer.style.shortName === selectedType
    //         })
    // }

    filterBeersByType(selectedTypeId) {
        this.filteredType = selectedTypeId
        if (!selectedTypeId) {
            return this.beers
        }
        this.apiService.getBeerByStyle(selectedTypeId).subscribe((response) => {
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
