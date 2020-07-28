import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../../services/api/api.service';

import {Beer} from '../../../models/beer/beer';
import {Item} from '../../../components/filter-function/filter-function.component';

@Component({
    selector: 'app-beer-list',
    templateUrl: './beer-list.component.html',
    styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
    beers: Beer[] = [];
    filteredBeers: Beer[] = [];
    isLoading = true;
    pageCount = 0;
    beerTypes: Item[] = [];
    filteredType: string;
    errorMessage: string;

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getAllBeers(1);
        this.getBeerStyles();
    }

    getAllBeers(page: number): void {
        this.isLoading = true;
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.beers = response.data;
            this.isLoading = false;
            this.pageCount = response.numberOfPages;
            this.filteredBeers = this.beers;
        });
    }

    onPageSelected($event): void {
        this.getAllBeers($event);
    }

    getBeerStyles(): void {
        this.apiService.getBeerStyles().subscribe((response) => {
            this.beerTypes = response
                .filter((style) => {
                    return style.shortName !== null && style.shortName !== undefined;
                })
                .map((style) => {
                    return {name: style.shortName, id: style.id};
                });
            this.beerTypes.sort((a, b) => (a.name > b.name) ? 1 : -1);
        });
    }

    onTypeChange(value: string): void {
        this.filterBeersByType(value);
    }

    filterBeersByType(selectedTypeId): Beer[] {
        this.filteredType = selectedTypeId;
        if (!selectedTypeId) {
            return this.beers;
        }
        this.apiService.getBeerByStyle(selectedTypeId).subscribe((response) => {
            this.pageCount = response.numberOfPages;
            if (this.pageCount === 0) {
                this.filteredBeers = [];
                return this.errorMessage = 'Sorry, no beer was found';
            } else {
                this.filteredBeers = response.data;
                this.errorMessage = '';
            }
        });
    }
}
