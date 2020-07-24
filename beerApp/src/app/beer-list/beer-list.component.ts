import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";

import {Beer} from "../models/beer";

@Component({
    selector: 'app-beer-list',
    templateUrl: './beer-list.component.html',
    styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
    beers: Array<Beer>
    loading: boolean = true;
    displayedPage: number = 1;


    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBeers(this.displayedPage)
    }

    getAllBeers(page: number) {
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.beers = response
            console.log("all beers response", this.beers)
            this.loading = false
        })
    }

    showPreviousPage() {
        if (this.displayedPage > 1) {
            this.displayedPage = this.displayedPage - 1
        }
        this.getAllBeers(this.displayedPage)
    }

    showNextPage() {
        if (this.displayedPage < 23) {
            this.displayedPage = this.displayedPage + 1
        }
        this.getAllBeers(this.displayedPage)
    }
}
