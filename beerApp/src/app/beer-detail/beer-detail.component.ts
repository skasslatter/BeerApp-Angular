import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {Beer} from "../models/beer";

@Component({
    selector: 'app-beer-detail',
    templateUrl: './beer-detail.component.html',
    styleUrls: ['./beer-detail.component.scss']
})

export class BeerDetailComponent implements OnInit {
    beer: Beer
    loading: boolean = true
    private routeSub: Subscription;

    constructor
    (private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getBeerInformation()
    }

    getBeerInformation() {
        this.routeSub = this.route.params.subscribe(params => {
            let selectedBeerID = params.id
            this.apiService.getBeerInformation(selectedBeerID).subscribe((response) => {
                console.log("Beer detail response", response)
                this.beer = response
                this.loading = false
            })
        })
    }
}
