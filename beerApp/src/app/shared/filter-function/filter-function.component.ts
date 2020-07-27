import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface Item {
    name: string;
    id: string;
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter-function.component.html',
    styleUrls: ['./filter-function.component.scss']
})
export class FilterFunctionComponent implements OnInit {
    @Input()
    items: Item[]

    @Input()
    currentValue: string

    @Output()
    onChanged = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onChange($event) {
        this.onChanged.emit($event)
    }
}
