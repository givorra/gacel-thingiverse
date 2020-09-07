import {Thing} from "../thing/interfaces";

export interface ThingCollectionState {
    things: Thing[];
}

export interface ThingCollectionProps {
    things: Thing[];
}

export interface PopularThingsData {
    searchThings: Thing[];
}

export interface PopularThingsVars {
    page: number;
    per_page: number;
    sort: string;
    query?: string;
}
