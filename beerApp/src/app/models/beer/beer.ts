import {Brewery} from '../brewery/brewery';

interface LabelSet {
    icon: string;
    large: string;
    medium: string;
    contentAwareMedium: string;
}

interface Style {
    name: string;
    shortName: string;
}

export interface Beer {
    breweries: Brewery[];
    name: string;
    description: string;
    id: number;
    style: Style;
    labels: LabelSet;
}
