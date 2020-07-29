import {Brewery} from '../brewery/brewery';

interface LabelSet {
    icon: string;
    large: string;
    medium: string;
    contentAwareMedium: string;
}

export interface Type {
    name: string;
    shortName: string;
    id: number;
}

export interface Beer {
    breweries: Brewery[];
    name: string;
    description: string;
    id: number;
    style: Type;
    labels: LabelSet;
}
