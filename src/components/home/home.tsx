import * as React from "react";
import {useState} from "react";
import {ThingCollection} from "../thing-collection/thing-collection";
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


function Home() {
    const [searchQuery, setSearchQuery] = useState<string>();
    const [searchSortIndex, setSearchSort] = useState<number>(SORT_FILTERS.indexOf(POPULAR_FILTER));
    const [isFeatured, setFeatured] = useState<boolean>();
    const [page, setPage] = useState<number>(INITIAL_ACTIVE_PAGE);

    const onChangeSearchQuery = (query: string) => {
        console.log("Query new value " + query);
        console.log("Index of filter " + SORT_FILTERS.indexOf(RELEVANT_FILTER));
        setSearchSort(SORT_FILTERS.indexOf(RELEVANT_FILTER));
        setSearchQuery(query);
    };

    const onChangeSort = (sort: number): void => {
        console.log("Sort New Value " + sort);
        setSearchSort(sort);
    };

    const onChangeFeatured = (isFeatured: boolean): void => {
        console.log("isFeatured New Value " + isFeatured);
        isFeatured ? setFeatured(isFeatured) : setFeatured(undefined);
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

    return (
        <Container fluid>
            <header>
                <NavBar onEnterKeyDown={onChangeSearchQuery}/>
            </header>
            <section>
                <HomeFilterBar onChangeSort={onChangeSort} sortFilters={SORT_FILTERS} sortFilterSelectedIndex={searchSortIndex}
                onChangeFeatured={onChangeFeatured}/>
            </section>
            {
                (loading) ? <p>Loading things...</p> :
                    (error) ? <p>Error [{JSON.stringify(error)}]</p> :
                        <section>
                            <ThingCollection things={data?.searchThings || []}/>
                            <Pagination onChangePage={onChangePage} activePage={page}/>
                        </section>

            }
        </Container>
    );
}

export default Home;
