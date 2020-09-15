export interface PaginationProps {
    onChangePage(page: number): void;

    activePage: number;
    maxPage: number;
}
