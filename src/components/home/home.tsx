import * as React from "react";
import {ThingCollection} from "../thing-collection/thing-collection";
import {gql, useQuery} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/interfaces";
import Container from "react-bootstrap/Container";
import NavBar from "../nav-bar/nav-bar";
import HomeFilterBar from "../home-filter-bar/home-filter-bar";
import {useState} from "react";

const POPULAR_THINGS = gql`
    query search($page: Int!, $per_page: Int!, $sort: String!) {
    searchThings(page: $page, per_page: $per_page, sort: $sort) {
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

interface HomeState {

}

interface HomeProps {

}

const initialState: PopularThingsVars = {
    page: 1,
    per_page: 10,
    sort: "popular",
    query: ""
};

function Home() {
    const [searchThingsVars, setSearchThingsVars] = useState<PopularThingsVars>(initialState);

    const onChangeSearchQuery = (query: string) => {
        console.log("Query new value " + query);
        setSearchThingsVars({
            page: searchThingsVars.page,
            per_page: searchThingsVars.per_page,
            sort: searchThingsVars.sort,
            query: query
        });
    };

    const onChangeSort = (sort: string) => {
        console.log("Sort New Value " + sort);
        setSearchThingsVars({
            page: searchThingsVars.page,
            per_page: searchThingsVars.per_page,
            sort: sort,
            query: searchThingsVars.query
        });
    };

    const {loading, error, data} = useQuery<PopularThingsData, PopularThingsVars>(
        POPULAR_THINGS,
        {variables: searchThingsVars, fetchPolicy: "no-cache"}
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
