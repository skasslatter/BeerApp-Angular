import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";

import {Beer} from "../../../models/beer";
import {PaginationComponent} from "../../../shared/pagination/pagination.component"

@Component({
    selector: 'app-beer-list',
    templateUrl: './beer-list.component.html',
    styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
    beers: Beer[] = [];
    isLoading: boolean = true;
    pageCount: number;
    beerStyles: string[] = [];

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
        })
    }

    onPageSelected($event) {
        this.getAllBeers($event)
    }

    getBeerStyles(){
        this.apiService.getBeerStyles().subscribe((response) => {
            const styles = response
                .filter((style) => {
                    return style.shortName !== null && style.shortName !== undefined
                })
                .map((style) => {
                    return style.shortName
                })
            console.log("beer styles", styles)
            this.beerStyles = styles
        })
    }
}
