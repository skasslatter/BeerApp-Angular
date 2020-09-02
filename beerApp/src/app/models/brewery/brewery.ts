interface ImageSet {
    medium: string;
    large: string;
}

interface Location {
    country: Country;
}

interface Country {
    displayName: string;
}

export interface Brewery {
    id: number;
    name: string;
    description: string;
    established: number;
    images: ImageSet;
    breweryType: string;
    city: string;
    country: string;
    website: string;
    locations: Array<Location>;
}

