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
    pageCount: number

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBeers(1)
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

    // showPreviousPage() {
    //     if (this.pageNumber > 1) {
    //         this.pageNumber = this.pageNumber - 1
    //         this.pagePlusOne = this.pagePlusOne - 1
    //         this.pagePlusTwo = this.pagePlusTwo - 1
    //         this.pagePlusThree = this.pagePlusThree - 1
    //     }
    //     this.getAllBeers(this.pageNumber)
    // }

    // showNextPage() {
    //     if (this.pageNumber < this.pageCount) {
    //         this.pageNumber = this.pageNumber + 1
    //         this.pagePlusOne = this.pagePlusOne + 1
    //         this.pagePlusTwo = this.pagePlusTwo + 1
    //         this.pagePlusThree = this.pagePlusThree + 1
    //     }
    //     this.getAllBeers(this.pageNumber)
    // }
    //
    // showDifferentPage(clickedPage) {
    //     this.getAllBeers(clickedPage)
    //     this.pageNumber = clickedPage
    //     this.pagePlusOne = clickedPage + 1
    //     this.pagePlusTwo = clickedPage + 2
    //     this.pagePlusThree = clickedPage + 3
    // }
}
