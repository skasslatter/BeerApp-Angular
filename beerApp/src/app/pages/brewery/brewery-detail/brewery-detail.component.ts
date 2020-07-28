import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../../services/api/api.service';

import {Brewery} from '../../../models/brewery/brewery';
import {Beer} from '../../../models/beer/beer';

@Component({
    selector: 'app-brewery-detail',
    templateUrl: './brewery-detail.component.html',
    styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
    breweryApiData: Beer[] = [];
    filteredBeers: Beer[] = [];
    breweryInfo: Brewery;
    isLoading = true;
    nameSearch: string;
    uniqueBeerTypes: any;
    filteredType: string;
    private routeSub: Subscription;

    constructor
   (private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            const selectedBreweryID = params.id;
            this.getBreweryInformation(selectedBreweryID);
        });
    }

    getBreweryInformation(id: number): void  {
        this.apiService.getBreweryInformation(id).subscribe((response) => {
            console.log('Brewery details response', response);
            this.breweryApiData = response;
            this.filteredBeers = response;
            this.breweryInfo = this.breweryApiData[0].breweries[0];
            this.isLoading = false;
            this.getBeerTypes();
        });
    }

    searchByName(value: string): void  {
        this.filteredType = '';
        this.nameSearch = value;
        this.filteredBeers = this.breweryApiData;
        const searchTerm = value.toLowerCase();
        const filteredBeers = this.breweryApiData
            .filter((beer) => {
                return beer.name.toLowerCase().indexOf(searchTerm) !== -1;
            });
        this.filteredBeers = filteredBeers;
    }

    getBeerTypes(): void  {
        const styles = this.breweryApiData
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
            return {name: type};
        });
        this.uniqueBeerTypes.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    onTypeChange(value: string): void  {
        this.filterBeersByType(value);
    }

    filterBeersByType(selectedType: string): Beer[]  {
        this.nameSearch = '';
        this.filteredType = selectedType;
        if (!selectedType) {
            return this.breweryApiData;
        }
        this.filteredBeers = this.breweryApiData
            .filter((beer) => {
                return beer.style !== null && beer.style !== undefined;
            })
            .filter((beer) => {
                return beer.style.shortName === selectedType;
            });
    }

    showAllBeers(): void {
        this.nameSearch = '';
        this.filteredType = '';
        this.filteredBeers = this.breweryApiData;
    }
}

