import {Injectable} from '@angular/core';

interface SearchableObject {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor() {
    }

    searchByValue<T extends SearchableObject>(value: string, items: T[]): T[] {
        const searchTerm = value.toLowerCase();
        return items
            .filter((item) => {
                return item.name.toLowerCase().indexOf(searchTerm) !== -1;
            });
    }
}

