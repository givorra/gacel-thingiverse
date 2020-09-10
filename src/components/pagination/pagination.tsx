import React from 'react';
import BSPagination from 'react-bootstrap/Pagination';
import {PaginationProps} from "./interfaces";
import {MAX_PAGE, MIDDLE_PAGE_INDEX, MIN_PAGE, VISIBLE_PAGES_NUMBER} from "./consts";

function Pagination(props: PaginationProps) {
    const onPaginationItemClick = (event: React.MouseEvent) => {
        props.onChangePage(+(event.currentTarget?.textContent || props.activePage));
    };

    const onPaginationFirstClick = () => {
        props.onChangePage(MIN_PAGE);
    };

    const onPaginationLastClick = () => {
        props.onChangePage(MAX_PAGE);
    };

    const onPaginationPrevClick = () => {
        if (props.activePage > MIN_PAGE)
            props.onChangePage(props.activePage - 1);
    };

    const onPaginationNextClick = () => {
        if (props.activePage < MAX_PAGE)
            props.onChangePage(props.activePage + 1);
    };

    const getNextVisiblePages = (): number[] => {
        let nextVisiblePages: number[] = [];
        let firstPage = props.activePage - Math.floor(VISIBLE_PAGES_NUMBER / 2);

        for (let i = firstPage; i < firstPage + VISIBLE_PAGES_NUMBER; i++) {
            nextVisiblePages.push(i);
        }

        return checkNextVisiblePages(props.activePage, nextVisiblePages);
    };

    const checkNextVisiblePages = (activePage: number, nextVisiblePages: number[]): number[] => {
        while (nextVisiblePages.indexOf(activePage) < MIDDLE_PAGE_INDEX)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        while (nextVisiblePages.indexOf(activePage) > MIDDLE_PAGE_INDEX)
            nextVisiblePages = nextVisiblePages.map(value => value + 1);

        while (nextVisiblePages[0] < MIN_PAGE)
            nextVisiblePages = nextVisiblePages.map(value => value + 1);

        while (nextVisiblePages[VISIBLE_PAGES_NUMBER - 1] > MAX_PAGE)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        return nextVisiblePages;
    };

    return (
        <BSPagination className="justify-content-center">
            <BSPagination.First onClick={onPaginationFirstClick}/>
            <BSPagination.Prev onClick={onPaginationPrevClick}/>
            {
                getNextVisiblePages().map((page: number) => {
                    return (
                        <BSPagination.Item active={page === props.activePage} key={page} onClick={onPaginationItemClick}
                                           value={page}>
                            {page}
                        </BSPagination.Item>)
                })
            }
            <BSPagination.Next onClick={onPaginationNextClick}/>
            <BSPagination.Last onClick={onPaginationLastClick}/>
        </BSPagination>
    )
}

export default Pagination;
