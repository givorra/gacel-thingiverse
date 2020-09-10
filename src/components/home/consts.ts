import {SortFilter} from "./interfaces";
import {WatchQueryFetchPolicy} from "@apollo/client";

export const POPULAR_FILTER: SortFilter = {text: "Popular", value: "popular"};
export const NEWEST_FILTER: SortFilter = {text: "Newest", value: "newest"};
export const RELEVANT_FILTER: SortFilter = {text: "Relevant", value: "relevant"};
export const TEXT_FILTER: SortFilter = {text: "Exact Text", value: "text"};
export const MAKES_FILTER: SortFilter = {text: "Most Makes", value: "makes"};

export const SORT_FILTERS: SortFilter[] = [
    POPULAR_FILTER,
    NEWEST_FILTER,
    RELEVANT_FILTER,
    TEXT_FILTER,
    MAKES_FILTER,
];

export const INITIAL_ACTIVE_PAGE = 1;
export const THINGS_PER_PAGE: number = 16;
export const FETCH_POLICY: WatchQueryFetchPolicy = "no-cache";
