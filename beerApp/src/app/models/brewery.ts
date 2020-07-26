interface ImageSet {
    medium: String,
    large: String,
}

interface Location {
    country: Country
}

interface Country {
    displayName: String
}

export interface Brewery {
    id: number,
    name: string,
    description: string,
    established: number,
    images: ImageSet,
    breweryType: string,
    city: string,
    country: string,
    website: string,
    locations: Array<Location>
}

