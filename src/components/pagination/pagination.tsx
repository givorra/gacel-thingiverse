import React from 'react';
import BSPagination from 'react-bootstrap/Pagination';
import {PaginationProps} from "./interfaces";
import {MIDDLE_PAGE_INDEX, MIN_PAGE, VISIBLE_PAGES_NUMBER} from "./consts";

function Pagination(props: PaginationProps) {
    const onPaginationItemClick = (event: React.MouseEvent) => {
        props.onChangePage(+(event.currentTarget?.textContent || props.activePage));
    };

    const onPaginationFirstClick = () => {
        props.onChangePage(MIN_PAGE);
    };

    const onPaginationLastClick = () => {
        props.onChangePage(props.maxPage);
    };

    const onPaginationPrevClick = () => {
        if (props.activePage > MIN_PAGE)
            props.onChangePage(props.activePage - 1);
    };

    const onPaginationNextClick = () => {
        if (props.activePage < props.maxPage)
            props.onChangePage(props.activePage + 1);
    };

    const getNextVisiblePages = (): number[] => {
        console.log("maxPage = " + props.maxPage);
        let nextVisiblePages: number[] = [];

        if (props.maxPage < VISIBLE_PAGES_NUMBER) {
            for (let i = 1; i <= props.maxPage; i++)
                nextVisiblePages.push(i);
            return nextVisiblePages;
        } else {
            let firstPage = props.activePage - Math.floor(VISIBLE_PAGES_NUMBER / 2);

            for (let i = firstPage; i < firstPage + VISIBLE_PAGES_NUMBER; i++) {
                nextVisiblePages.push(i);
            }

            return checkNextVisiblePages(props.activePage, nextVisiblePages);
        }
    };

    const checkNextVisiblePages = (activePage: number, nextVisiblePages: number[]): number[] => {
        while (nextVisiblePages.indexOf(activePage) < MIDDLE_PAGE_INDEX)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        while (nextVisiblePages.indexOf(activePage) > MIDDLE_PAGE_INDEX)
            nextVisiblePages = nextVisiblePages.map(value => value + 1);

        while (nextVisiblePages[0] < MIN_PAGE)
            nextVisiblePages = nextVisiblePages.map(value => value + 1);

        while (nextVisiblePages[VISIBLE_PAGES_NUMBER - 1] > props.maxPage)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        return nextVisiblePages;
    };

    return (
        props.maxPage > 0 ?
            <BSPagination className="justify-content-center pt-4 pb-4">
                <BSPagination.First onClick={onPaginationFirstClick}/>
                <BSPagination.Prev onClick={onPaginationPrevClick}/>
                {
                    getNextVisiblePages().map((page: number) => {
                        return (
                            <BSPagination.Item active={page === props.activePage} key={page}
                                               onClick={onPaginationItemClick}
                                               value={page}>
                                {page}
                            </BSPagination.Item>)
                    })
                }
                <BSPagination.Next onClick={onPaginationNextClick}/>
                <BSPagination.Last onClick={onPaginationLastClick}/>
            </BSPagination> :
            null
    )
}

export default Pagination;