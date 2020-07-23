import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

interface ApiBreweriesResponse {
  data: Array<Brewery>
}

interface Brewery {
  name: String,
  description: String,
  established: Number,
  id: String,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getAllBreweries(): Observable<any> {
    let breweries = []
    return this.http.get("/api/breweries?withLocations=Y")
      .pipe((map((data: ApiBreweriesResponse) => {
        breweries = data.data;
        return breweries;
      })))
  }

  getBreweryInformation(id: number): Observable<any> {
    let breweryApiData = []
    return this.http.get(`/api/brewery/${id}/beers?withBreweries=Y`)
      .pipe((map((data: ApiBreweriesResponse) => {
        breweryApiData = data.data;
        return breweryApiData;
      })))
  }
}
