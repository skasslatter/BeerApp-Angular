import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input()
    pageCount: number;

    @Output()
    selectedPage = new EventEmitter<number>();

    pageNumber = 1;
    displayedPages: number[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.getDisplayedPages();
    }

    getDisplayedPages(): void {
        const arr = [];
        if (this.pageNumber < 3) {
            for (let i = 1; i <= 5 && i <= this.pageCount; i++) {
                arr.push(i);
            }
        } else if (this.pageNumber < this.pageCount - 2) {
            for (let i = this.pageNumber - 2; i <= this.pageNumber + 2; i++) {
                arr.push(i);
            }
        } else {
            for (let i = this.pageCount - 4; i <= this.pageCount; i++) {
                arr.push(i);
            }
        }
        this.displayedPages = arr;
    }

    showPreviousPage(): void {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1;
            this.getDisplayedPages();
        }
        this.selectedPage.emit(this.pageNumber);
    }

    showNextPage(): void {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageNumber + 1;
            this.getDisplayedPages();
        }
        this.selectedPage.emit(this.pageNumber);
    }

    showDifferentPage(clickedPage): void {
        this.pageNumber = clickedPage;
        this.getDisplayedPages();
        this.selectedPage.emit(clickedPage);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getDisplayedPages();
    }
}
