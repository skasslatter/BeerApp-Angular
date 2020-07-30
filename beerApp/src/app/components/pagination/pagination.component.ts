import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input()
    pageCount: number;

    @Input()
    currentPage = 1;

    @Output()
    selectedPage = new EventEmitter<number>();

    displayedPages: number[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.getDisplayedPages();
    }

    getDisplayedPages(): void {
        const arr = [];
        if (this.currentPage < 3) {
            for (let i = 1; i <= Math.min(5, this.pageCount); i++) {
                arr.push(i);
            }
        } else if (this.currentPage < this.pageCount - 2) {
            for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
                arr.push(i);
            }
        } else {
            for (let i = Math.max(1, this.pageCount - 4); i <= this.pageCount; i++) {
                arr.push(i);
            }
        }
        this.displayedPages = arr;
    }

    showPreviousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.getDisplayedPages();
        }
        this.selectedPage.emit(this.currentPage);
    }

    showNextPage(): void {
        if (this.currentPage < this.pageCount) {
            this.currentPage = this.currentPage + 1;
            this.getDisplayedPages();
        }
        this.selectedPage.emit(this.currentPage);
    }

    showDifferentPage(clickedPage): void {
        this.currentPage = clickedPage;
        this.getDisplayedPages();
        this.selectedPage.emit(clickedPage);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getDisplayedPages();
    }
}
