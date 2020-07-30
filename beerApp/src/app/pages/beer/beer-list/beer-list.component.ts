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
    isLoading = true;
    currentPage = 1;
    totalPages: number;
    beerTypes: Item[] = [];
    filteredType: string;
    searchedName: string;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.getAllBeers(1);
        this.getBeerTypes();
    }

    getAllBeers(page: number): void {
        this.isLoading = true;
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.beers = response.data;
            this.isLoading = false;
            this.totalPages = response.numberOfPages;
            this.currentPage = response.currentPage;
        });
    }

    getBeerTypes(): void {
        this.apiService.getBeerTypes().subscribe((response) => {
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

    onNewPageSelected(pageNumber): void {
        if (this.filteredType) {
            this.filterBeersByType(this.filteredType, pageNumber);
        } else {
            this.getAllBeers(pageNumber);
        }
    }

    onBeerTypeChange(value: string): void {
        this.searchedName = '';
        this.filteredType = value;
        this.filterBeersByType(value, 1);
    }

    filterBeersByType(selectedTypeId: string, page: number): void {
        this.isLoading = true;
        this.apiService.getBeerByType(selectedTypeId, page).subscribe((response) => {
            this.isLoading = false;
            this.currentPage = response.currentPage;
            this.totalPages = response.numberOfPages;
            if (this.totalPages === 0) {
                this.beers = [];
            } else {
                this.beers = response.data;
            }
        });
    }

    searchByName(value): void {
        this.isLoading = true;
        this.filteredType = '';
        this.searchedName = value;
        this.currentPage = 1;
        this.totalPages = 1;
        this.apiService.getBeerByName(value).subscribe((response) => {
            this.isLoading = false;
            if (!response) {
                this.beers = [];
            } else {
                this.beers = response;
            }
        });
    }

    clearFilters(): void {
        this.filteredType = '';
        this.searchedName = '';
        this.getAllBeers(1);
    }
}
