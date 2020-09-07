import * as React from "react";
import {ThingCollection} from "../thing-collection/thing-collection";
import {gql, useQuery, WatchQueryFetchPolicy} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/interfaces";
import Container from "react-bootstrap/Container";
import NavBar from "../nav-bar/nav-bar";
import HomeFilterBar from "../home-filter-bar/home-filter-bar";
import {useState} from "react";

const POPULAR_THINGS = gql`
    query search($page: Int!, $per_page: Int!, $sort: String!, $query: String) {
    searchThings(page: $page, per_page: $per_page, sort: $sort, query: $query) {
        id
        name
        public_url
        like_count
        is_liked
        comment_count
        preview_image
    }
  }
`;

const thingsPerPage: number = 10;
const fetchPolicy: WatchQueryFetchPolicy = "no-cache";

function Home() {
    const [searchQuery, setSearchQuery] = useState<string>();
    const [searchSort, setSearchSort] = useState<string>("popular");
    const [page, setPage] = useState<number>(1);

    const onChangeSearchQuery = (query: string) => {
        console.log("Query new value " + query);
        setSearchQuery(query);
    };

    const onChangeSort = (sort: string) => {
        console.log("Sort New Value " + sort);
        setSearchSort(sort);
    };

    // FIXME [apollo client bug]: useQuery don't return data when query is cached. Workaround -> fetchPolicy: "no-cache"
    const {loading, error, data} = useQuery<PopularThingsData, PopularThingsVars>(
        POPULAR_THINGS,
        {
            variables:
                {
                    per_page: thingsPerPage,
                    page: page,
                    query: searchQuery,
                    sort: searchSort
                },
            fetchPolicy: fetchPolicy
        }
    );

    return (
        <Container fluid>
            <header>
                <NavBar onEnterKeyDown={onChangeSearchQuery}/>
            </header>
            <section>
                <HomeFilterBar onChangeSort={onChangeSort}/>
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
