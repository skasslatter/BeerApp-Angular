import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Brewery} from '../../app/models/brewery/brewery';

interface ApiResponse {
    data: Array<Brewery>;
}


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {
    }

    getAllBreweries(): Observable<any> {
        let breweries = [];
        return this.http.get('/api/breweries?withLocations=Y')
            .pipe((map((data: ApiResponse) => {
                breweries = data.data;
                return breweries;
            })));
    }

    getAllBeers(page): Observable<any> {
        return this.http.get(`/api/beers?withBreweries=Y&withLocations=Y&p=${page}`)
            .pipe((map((data) => {
                return data;
            })));
    }

    getBreweryInformation(id: number): Observable<any> {
        let breweryApiData = [];
        return this.http.get(`/api/brewery/${id}/beers?withBreweries=Y`)
            .pipe((map((data: any) => {
                breweryApiData = data.data;
                return breweryApiData;
            })));
    }

    getBeerInformation(id: number): Observable<any> {
        let beerApiData = [];
        return this.http.get(`/api/beer/${id}?withBreweries=Y`)
            .pipe((map((data: any) => {
                beerApiData = data.data;
                return beerApiData;
            })));
    }

    getBeerStyles(): Observable<any> {
        let beerStyles = [];
        return this.http.get(`/api/styles?withBreweries=Y`)
            .pipe((map((data: any) => {
                beerStyles = data.data;
                return beerStyles;
            })));
    }

    getBeerByStyle(id): Observable<any> {
        return this.http.get(`/api/beers?styleId=${id}`)
            .pipe((map((data: any) => {
                return data;
            })));
    }

    getBeerByName(name): Observable<any> {
        let beers = [];
        return this.http.get(`/api/beers?name=${name}`)
            .pipe((map((data: any) => {
                beers = data.data;
                return beers;
            })));
    }
}
