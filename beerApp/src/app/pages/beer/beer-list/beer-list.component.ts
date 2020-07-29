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
    allBeers: Beer[] = [];
    filteredBeers: Beer[] = [];
    isLoading = true;
    currentPage = 0;
    totalPages: number;
    beerTypes: Item[] = [];
    filteredType: string;
    errorMessage: string;
    nameSearch: string;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.getAllBeers(1);
        this.clearFilters(1);
        this.getBeerTypes();
    }

    onPageSelected($event): void {
        this.getAllBeers($event);
    }

    getAllBeers(page: number): void {
        this.isLoading = true;
        this.apiService.getAllBeers(page).subscribe((response) => {
            this.allBeers = response.data;
            this.isLoading = false;
            this.filteredType = '';
            this.totalPages = response.numberOfPages;
            this.currentPage = this.totalPages;
            this.filteredBeers = this.allBeers;
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

    onTypeChange(value: string): void {
        this.filterBeersByType(value);
    }

    filterBeersByType(selectedTypeId): Beer[] {
        this.nameSearch = '';
        this.filteredType = selectedTypeId;
        if (!selectedTypeId) {
            return this.allBeers;
        }
        this.apiService.getBeerByType(selectedTypeId).subscribe((response) => {
            this.currentPage = response.numberOfPages;
            if (this.currentPage === 0) {
                this.filteredBeers = [];
                return this.errorMessage = 'Sorry, no beer was found';
            } else {
                this.filteredBeers = response.data;
                this.errorMessage = '';
            }
        });
    }

    searchByName(value): void {
        this.isLoading = true;
        this.filteredType = '';
        this.errorMessage = '';
        this.nameSearch = value;
        this.currentPage = 0;
        this.apiService.getBeerByName(value).subscribe((response) => {
            this.filteredBeers = response;
            this.isLoading = false;
        });
    }

    clearFilters(page: number): void {
        this.filteredBeers = this.allBeers;
        this.filteredType = '';
        this.nameSearch = '';
        this.errorMessage = '';
        this.currentPage = this.totalPages;
    }
}
