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
    displayedPages: number[] = []

    constructor() {
    }

    ngOnInit(): void {
        this.calcDisplayedPages()
    }

    calcDisplayedPages(): void {
        const arr = []
        if (this.pageNumber < 3) {
            for (let i = 1; i <= 5; i++) {
                arr.push(i)
            }
        } else if (this.pageNumber < this.pageCount - 2) {
            for (let i = this.pageNumber - 2; i <= this.pageNumber + 2; i++) {
                arr.push(i)
            }
        } else {
            for (let i = this.pageCount - 4; i <= this.pageCount; i++) {
                arr.push(i)
            }
        }
        this.displayedPages = arr

    }

    showPreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1
            this.calcDisplayedPages();
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showNextPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageNumber + 1
            this.calcDisplayedPages()
        }
        this.selectedPage.emit(this.pageNumber)
    }

    showDifferentPage(clickedPage) {
        this.selectedPage.emit(clickedPage)
        this.pageNumber = clickedPage
        this.calcDisplayedPages()
    }
}
