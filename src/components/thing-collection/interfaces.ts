import {SearchThing, Thing} from "../thing/interfaces";

export interface ThingCollectionState {
    things: Thing[];
}

export interface ThingCollectionProps {
    things: Thing[];
}

export interface PopularThingsData {
    searchThings: SearchThing;
}

export interface PopularThingsVars {
    page: number;
    per_page: number;
    sort: string;
    query?: string;
    is_featured?: boolean;
}
