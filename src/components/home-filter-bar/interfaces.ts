import {SortFilter} from "../home/interfaces";

export interface HomeFilterBarProps {
    onChangeSort(sort: number): void,
    onChangeFeatured(isFeatured: boolean): void,

    sortFilters: SortFilter[],
    sortFilterSelectedIndex: number
}
