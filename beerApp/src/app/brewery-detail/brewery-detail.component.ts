import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Beer {
  breweries: Array<Brewery>
  name: String,
  id: Number,
  style: Style,
  labels: LabelSet
}

interface LabelSet {
  icon: String,
  large: String,
}

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

interface Style {
  description: String,
  name: String,
}

interface ApiBreweryInfoResponse {
  data: Array<Beer>,
}

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
  breweryApiData: Array<Beer>;
  breweryInfo: Brewery;
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
    let obs = this.http.get(`/api/brewery/${id}/beers?withBreweries=Y`)
    obs.subscribe(
      (response: ApiBreweryInfoResponse) => {
        console.log('breweryData response', response);
        this.breweryApiData = response.data
        this.breweryInfo = this.breweryApiData[0].breweries[0]
        this.loading = false
      });
  }

}
