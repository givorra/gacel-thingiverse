import * as React from "react";
import {ThingCollection} from "../thing-collection/thing-collection";
import {gql, useQuery} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/interfaces";
import Container from "react-bootstrap/Container";
import NavBar from "../nav-bar/nav-bar";

const POPULAR_THINGS = gql`
    query PopularThings($page: Int!, $per_page: Int!) {
    popularThings(page: $page, per_page: $per_page) {
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

const searchThing = (query: string): void => {
    console.log(`query = ${query}`)
};

function Home() {
    const {loading, error, data} = useQuery<PopularThingsData, PopularThingsVars>(
        POPULAR_THINGS,
        {variables: {page: 1, per_page: 10}}
    );

    if (loading) {
        return (<p>Loading things...</p>);
    } else if (error) {
        return (<p>Error [{JSON.stringify(error)}]</p>);
    } else {
        return (
                <Container fluid>
                    <header>
                        <NavBar onEnterKeyDown={searchThing}/>
                    </header>
                    <section>
                        <ThingCollection things={data?.popularThings || []}/>
                    </section>
                </Container>
        );
    }
}

export default Home;
