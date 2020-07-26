import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input()
    pageCount: number;

    @Output()
    selectedPage = new EventEmitter<number>()

    pageNumber: number = 1;
    pagePlusOne: number = this.pageNumber + 1;
    pagePlusTwo: number = this.pageNumber + 2;
    pagePlusThree: number = this.pageNumber + 3;

    constructor() {
    }

    ngOnInit(): void {
    }

    showPreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1
            this.pagePlusOne = this.pagePlusOne - 1
            this.pagePlusTwo = this.pagePlusTwo - 1
            this.pagePlusThree = this.pagePlusThree - 1
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showNextPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageNumber + 1
            this.pagePlusOne = this.pagePlusOne + 1
            this.pagePlusTwo = this.pagePlusTwo + 1
            this.pagePlusThree = this.pagePlusThree + 1
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showDifferentPage(clickedPage) {
        this.selectedPage.emit(clickedPage)
        this.pageNumber = clickedPage
        this.pagePlusOne = clickedPage + 1
        this.pagePlusTwo = clickedPage + 2
        this.pagePlusThree = clickedPage + 3
    }
}
