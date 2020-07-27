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
    beerTypes: object
    filteredType: string;

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
            console.log("xxx", this.beerTypes)
        })
    }

    onTypeChange(value: string) {
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

    filterBeersByType(selectedType) {
        this.filteredType = selectedType
        if (!selectedType) {
            return this.beers
        }
        this.apiService.getBeerByStyle(selectedType.id).subscribe((response) => {
            console.log("this", response)
        })
    }
}
