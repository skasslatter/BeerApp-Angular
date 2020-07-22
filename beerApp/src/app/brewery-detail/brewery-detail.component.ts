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
  name: String,
  shortName: String,
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
  filteredBeers: Array<Beer>
  breweryInfo: Brewery;
  loading: boolean = true;
  nameSearch: String = ""
  uniqueBeerTypes: Array<String>
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
        console.log('breweryData response', response.data);
        this.breweryApiData = response.data
        this.filteredBeers = response.data
        this.breweryInfo = this.breweryApiData[0].breweries[0]
        this.loading = false
        this.getBeerTypes()
      });
  }

  searchByName(value) {
    this.nameSearch = value
    this.filteredBeers = this.breweryApiData
    const searchTerm = value.toLowerCase()
    const filteredBeers = this.breweryApiData
      .filter((beer) => {
        return beer.name.toLowerCase().indexOf(searchTerm) !== -1
      })
    console.log("filteredBeers", filteredBeers)
    this.filteredBeers = filteredBeers
  }

  showAllBeers() {
    this.nameSearch = "";
    this.filteredBeers = this.breweryApiData
  }

  getBeerTypes() {
    const styles = this.breweryApiData
      .filter((beer) => {
        return beer.style !== null && beer.style !== undefined
      })
      .map((beer) => {
        return beer.style
      })
    const types = styles.map((style) => {
      return style.shortName
    })
    console.log("types", types)
    let uniqueBeerTypes = [...new Set(types)]
    this.uniqueBeerTypes = uniqueBeerTypes
    console.log("uniqueBeerTypes", uniqueBeerTypes)
  }
}
