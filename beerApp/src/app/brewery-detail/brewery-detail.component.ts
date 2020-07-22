import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Brewery {
  name: String,
  description: String,
  established: Number,
  website: String,
  images?: ImageSet,
}

interface ImageSet {
  medium: String,
  large: String,
}

interface ApiBreweryInfoResponse {
  data: Brewery;
}

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
  breweryData: Brewery;
  loading: boolean = true;
  private routeSub: Subscription;

  constructor
  (private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let selectedBreweryID = params.id
      console.log("selectedBreweryID:", selectedBreweryID)

      this.getBreweryInformation(selectedBreweryID)
    });
  }

  getBreweryInformation(id) {
    let obs = this.http.get(`/api/brewery/${id}`)
    obs.subscribe(
      (response: ApiBreweryInfoResponse) => {
        console.log('response', response);
        this.breweryData = response.data
        this.loading = false
      });
  }

  getAllBreweryBeers() {

  }
}
