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
    displayedPages: number[] = [1, 2, 3, 4, 5]
    // pagePlusOne: number = this.pageNumber + 1;
    // pagePlusTwo: number = this.pageNumber + 2;
    // pagePlusThree: number = this.pageNumber + 3;

    constructor() {
    }

    ngOnInit(): void {
    }

    showPreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1
            this.displayedPages = this.displayedPages.map((num) =>{
                return num - 1
            })
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showNextPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageNumber + 1
            this.displayedPages = this.displayedPages.map((num) =>{
                return num + 1
            })
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showDifferentPage(clickedPage) {
        this.selectedPage.emit(clickedPage)
        this.pageNumber = clickedPage
        this.displayedPages = this.displayedPages.map((num, i) =>{
            return clickedPage + i
        })
    }
}
