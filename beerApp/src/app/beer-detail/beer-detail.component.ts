import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {
  private routeSub: Subscription;

  constructor
  (private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      let selectedBeerID = params.id
      console.log("selectedBeerID", selectedBeerID)
      // this.getBeerInformation(selectedBeerID)
    });
  }

}
