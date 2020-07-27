import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter-function.component.html',
    styleUrls: ['./filter-function.component.scss']
})
export class FilterFunctionComponent implements OnInit {
    @Input()
    values: string[] = [];
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
