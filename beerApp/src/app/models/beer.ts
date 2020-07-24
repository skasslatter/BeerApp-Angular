import {Brewery} from "./brewery";

interface LabelSet {
  icon: String,
  large: String,
  medium: String,
}

interface Style {
  name: String,
  shortName: String,
}

export interface Beer {
  breweries: Array<Brewery>
  name: String,
  description: String,
  id: Number,
  style: Style,
  labels: LabelSet
}
