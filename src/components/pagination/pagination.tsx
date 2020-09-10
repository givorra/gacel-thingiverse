import React, {useState, MouseEvent} from 'react';
import BSPagination from 'react-bootstrap/Pagination';

const initialActivePage: number = 1;
const initialVisiblePages: number[] = [1, 2, 3, 4, 5];
const middlePageIndex: number = Math.floor(initialVisiblePages.length / 2);
const minPage: number = 1;
const maxPage: number = 625;

function Pagination() {
    const [activePage, setActivePage] = useState<number>(initialActivePage);
    const [visiblePages, setVisiblePages] = useState<number[]>(initialVisiblePages);

    const onPaginationItemClick = (event: React.MouseEvent) => {
        const nextActivePage: number = +(event.currentTarget?.textContent || activePage);
        setNextVisiblePages(nextActivePage);
        setActivePage(nextActivePage);
    };

    const onPaginationFirstClick = () => {
        setActivePage(initialActivePage);
        setVisiblePages(initialVisiblePages);
    };

    const onPaginationLastClick = () => {
        let nextVisiblePages: number[] = [];
        for (let i = maxPage - initialVisiblePages.length + 1; i <= maxPage; i++) {
            nextVisiblePages.push(i);
        }
        setVisiblePages(nextVisiblePages);
        setActivePage(maxPage);
    };

    const onPaginationPrevClick = () => {
        if (activePage > minPage) {
            const nextActivePage: number = activePage - 1;
            setNextVisiblePages(nextActivePage);
            setActivePage(nextActivePage);
        }
    };

    const onPaginationNextClick = () => {
        console.log("middlePageIndex " + middlePageIndex);
        console.log("visiblePages[initialVisiblePages.length] " + visiblePages[initialVisiblePages.length]);

        if (activePage < maxPage) {
            const nextActivePage: number = activePage + 1;
            setNextVisiblePages(nextActivePage);
            setActivePage(nextActivePage);
        }
    };

    const setNextVisiblePages = (nextActivePage: number): void => {
        let nextVisiblePages: number[] = visiblePages;

        while (nextVisiblePages.indexOf(nextActivePage) < middlePageIndex)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        while (nextVisiblePages.indexOf(nextActivePage) > middlePageIndex)
            nextVisiblePages = nextVisiblePages.map(value => value + 1);

        while (nextVisiblePages[0] < minPage)
            nextVisiblePages = nextVisiblePages.map(value => {return value + 1});

        while (nextVisiblePages[initialVisiblePages.length - 1] > maxPage)
            nextVisiblePages = nextVisiblePages.map(value => value - 1);

        setVisiblePages(nextVisiblePages);
    };

    return (
        <BSPagination className="justify-content-center">
            <BSPagination.First onClick={onPaginationFirstClick} />
            <BSPagination.Prev onClick={onPaginationPrevClick}/>
            {
                visiblePages.map((page: number) => {
                    return (<BSPagination.Item active={page === activePage} key={page} onClick={onPaginationItemClick} value={page}>{page}</BSPagination.Item>)
                })
            }
            <BSPagination.Next onClick={onPaginationNextClick}/>
            <BSPagination.Last onClick={onPaginationLastClick}/>
        </BSPagination>
    )
}

export default Pagination;
