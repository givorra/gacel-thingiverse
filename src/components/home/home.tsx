import * as React from "react";
import {useState} from "react";
import {ThingCollection} from "../thing-collection/thing-collection";
import {useQuery} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/interfaces";
import Container from "react-bootstrap/Container";
import NavBar from "../nav-bar/nav-bar";
import HomeFilterBar from "../home-filter-bar/home-filter-bar";
import {FETCH_POLICY, POPULAR_FILTER, RELEVANT_FILTER, SORT_FILTERS, THINGS_PER_PAGE} from "./consts";
import {GQL_SEARCH_THINGS} from "../../graphql/queries";


function Home() {
    const [searchQuery, setSearchQuery] = useState<string>();
    const [searchSortIndex, setSearchSort] = useState<number>(SORT_FILTERS.indexOf(POPULAR_FILTER));
    const [page, setPage] = useState<number>(1);

    const onChangeSearchQuery = (query: string) => {
        console.log("Query new value " + query);
        console.log("Index of filter " + SORT_FILTERS.indexOf(RELEVANT_FILTER));
        setSearchSort(SORT_FILTERS.indexOf(RELEVANT_FILTER));
        setSearchQuery(query);
    };

    const onChangeSort = (sort: number) => {
        console.log("Sort New Value " + sort);
        setSearchSort(sort);
    };

    // FIXME [apollo client bug]: useQuery don't return data when query is cached. Workaround -> fetchPolicy: "no-cache"
    const {loading, error, data} = useQuery<PopularThingsData, PopularThingsVars>(
        GQL_SEARCH_THINGS,
        {
            variables:
                {
                    per_page: THINGS_PER_PAGE,
                    page: page,
                    query: searchQuery,
                    sort: SORT_FILTERS[searchSortIndex].value
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
                <HomeFilterBar onChangeSort={onChangeSort} sortFilters={SORT_FILTERS}
                               sortFilterSelectedIndex={searchSortIndex}/>
            </section>
            {
                (loading) ? <p>Loading things...</p> :
                    (error) ? <p>Error [{JSON.stringify(error)}]</p> :
                        <section>
                            <ThingCollection things={data?.searchThings || []}/>
                        </section>
            }

        </Container>
    );
}

export default Home;
