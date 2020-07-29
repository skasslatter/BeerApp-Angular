import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../../services/api/api.service';

import {Brewery} from '../../../models/brewery/brewery';
import {Beer} from '../../../models/beer/beer';
import {Item} from '../../../components/filter-function/filter-function.component';
import {SearchService} from '../../../../services/search/search.service';

@Component({
    selector: 'app-brewery-detail',
    templateUrl: './brewery-detail.component.html',
    styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
    allBeers: Beer[] = [];
    filteredBeers: Beer[] = [];
    breweryInfo: Brewery;
    isLoading = true;
    nameSearch: string;
    uniqueBeerTypes: Item[] = [];
    filteredType: string;
    errorMessage: string;
    private routeSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private apiService: ApiService,
        private searchService: SearchService,
    ) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            const selectedBreweryID = params.id;
            this.getBreweryInformation(selectedBreweryID);
        });
    }

    getBreweryInformation(id: number): void {
        this.apiService.getBreweryInformation(id).subscribe((response) => {
            this.isLoading = false;
            if (!response) {
                this.errorMessage = 'Sorry, no Data available';
            }
            else{
            this.allBeers = response;
            this.filteredBeers = response;
            this.breweryInfo = this.allBeers[0].breweries[0];
            this.getBeerTypes();
            }
        });
    }

    searchByName(value: string): void {
        this.filteredBeers = this.allBeers;
        this.filteredType = '';
        this.nameSearch = value;
        this.filteredBeers = this.searchService.searchByValue(value, this.allBeers);
    }

    getBeerTypes(): void {
        const styles = this.allBeers
            .filter((beer) => {
                return beer.style !== null && beer.style !== undefined;
            })
            .map((beer) => {
                return beer.style;
            });
        const types = styles.map((style) => {
            return style.shortName;
        });
        const unique = [...new Set(types)];
        this.uniqueBeerTypes = unique.map((type) => {
            return {id: type, name: type};
        });
        this.uniqueBeerTypes.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    onTypeChange(value: string): void {
        this.filterBeersByType(value);
    }

    filterBeersByType(selectedType: string): Beer[] {
        this.nameSearch = '';
        this.filteredType = selectedType;
        if (!selectedType) {
            return this.allBeers;
        }
        this.filteredBeers = this.allBeers
            .filter((beer) => {
                return beer.style !== null && beer.style !== undefined;
            })
            .filter((beer) => {
                return beer.style.shortName === selectedType;
            });
    }

    clearFilters(): void {
        this.nameSearch = '';
        this.filteredType = '';
        this.filteredBeers = this.allBeers;
    }
}

