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
    beers: Array<Beer>
    loading: boolean = true;
    page: number = 1;
    pagePlusOne: number = this.page + 1;
    pagePlusTwo: number = this.page + 2;
    pagePlusThree: number = this.page + 3;

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBeers(this.page)
    }

    getAllBeers(page: number) {
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.beers = response
            console.log("all beers response", this.beers)
            this.loading = false
        })
    }

    showPreviousPage() {
        if (this.page > 1) {
            this.page = this.page - 1
        }
        this.getAllBeers(this.page)
        this.pagePlusOne = this.pagePlusOne - 1
        this.pagePlusTwo = this.pagePlusTwo - 1
        this.pagePlusThree = this.pagePlusThree - 1
    }

    showNextPage() {
        if (this.page < 23) {
            this.page = this.page + 1
        }
        this.getAllBeers(this.page)
        this.pagePlusOne = this.pagePlusOne + 1
        this.pagePlusTwo = this.pagePlusTwo + 1
        this.pagePlusThree = this.pagePlusThree + 1
    }

    showDifferentPage(clickedPage) {
        this.getAllBeers(clickedPage)
        this.page = clickedPage
        this.pagePlusOne = clickedPage + 1
        this.pagePlusTwo = clickedPage + 2
        this.pagePlusThree = clickedPage + 3
    }
}
