import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";

import { Beer } from "../models/beer";

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
  beers: Array<Beer>

  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getAllBeers()
  }

  getAllBeers() {
    this.apiService.getAllBeers().subscribe((response) => {
      this.beers = response
      console.log("all beers response", this.beers)
    })
  }
}
