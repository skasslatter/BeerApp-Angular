import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor() {
    }

    searchByValue(value, items): any {
        const searchTerm = value.toLowerCase();
        return items
            .filter((item) => {
                return item.name.toLowerCase().indexOf(searchTerm) !== -1;
            });
    }
}

