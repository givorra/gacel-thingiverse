import * as React from "react";
import {useState} from "react";
import ThingCollection from "../thing-collection/thing-collection";
import {useQuery} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/interfaces";
import Container from "react-bootstrap/Container";
import NavBar from "../nav-bar/nav-bar";
import HomeFilterBar from "../home-filter-bar/home-filter-bar";
import {
    FETCH_POLICY,
    INITIAL_ACTIVE_PAGE,
    POPULAR_FILTER,
    RELEVANT_FILTER,
    SORT_FILTERS,
    THINGS_PER_PAGE
} from "./consts";
import {GQL_SEARCH_THINGS} from "../../graphql/queries";
import Pagination from "../pagination/pagination";
import {HomeLocationState} from "./interfaces";
import {useLocation} from "react-router";
import LoadingSpinner from "../loading-spinner/loading-spinner";


function Home() {
    const location = useLocation<HomeLocationState>();
    const [searchQuery, setSearchQuery] = useState<string>(location.state?.searchQuery);
    const [searchSortIndex, setSearchSort] = useState<number>(SORT_FILTERS.indexOf(POPULAR_FILTER));
    const [isFeatured, setFeatured] = useState<boolean>();
    const [page, setPage] = useState<number>(INITIAL_ACTIVE_PAGE);

    const onChangeSearchQuery = (query: string) => {
        setSearchSort(SORT_FILTERS.indexOf(RELEVANT_FILTER));
        setSearchQuery(query);
        setPage(INITIAL_ACTIVE_PAGE);
    };

    const onChangeSort = (sort: number): void => {
        setSearchSort(sort);
        setPage(INITIAL_ACTIVE_PAGE);
    };

    const onChangeFeatured = (isFeatured: boolean): void => {
        isFeatured ? setFeatured(isFeatured) : setFeatured(undefined);
        setPage(INITIAL_ACTIVE_PAGE);
    };

    const onChangePage = (page: number): void => {
        setPage(page);
    };

    // FIXME [react-apollo issue -> https://github.com/apollographql/react-apollo/issues/3816]: useQuery don't return data when query is cached.
    //  Workaround -> fetchPolicy: "no-cache"
    const {loading, error, data} = useQuery<PopularThingsData, PopularThingsVars>(
        GQL_SEARCH_THINGS,
        {
            variables:
                {
                    per_page: THINGS_PER_PAGE,
                    page: page,
                    query: searchQuery,
                    sort: SORT_FILTERS[searchSortIndex].value,
                    is_featured: isFeatured
                },
            fetchPolicy: FETCH_POLICY
        }
    );

    const getPaginationMaxPage = (): number => {
        if (data?.searchThings.total && data?.searchThings.total > 0) {
            return Math.ceil((data?.searchThings.total || THINGS_PER_PAGE) / THINGS_PER_PAGE);
        } else {
            return 0;
        }
    };

    return (
        <Container fluid>
            <header>
                <NavBar onEnterKeyDown={onChangeSearchQuery} searchQuery={searchQuery}/>
            </header>
            <section>
                <HomeFilterBar onChangeSort={onChangeSort} sortFilters={SORT_FILTERS} sortFilterSelectedIndex={searchSortIndex}
                onChangeFeatured={onChangeFeatured}/>
            </section>
            {
                (loading) ? <LoadingSpinner/> :
                    (error) ? <p>Error [{JSON.stringify(error)}]</p> :
                        <section>
                            <ThingCollection things={data?.searchThings.things || []}/>
                            <Pagination onChangePage={onChangePage} activePage={page} maxPage={getPaginationMaxPage()}/>
                        </section>

            }
        </Container>
    );
}

export default Home;
