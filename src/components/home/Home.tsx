import * as React from "react";
import {ThingCollection} from "../thing-collection/ThingCollection";
import {gql, useQuery} from "@apollo/client";
import {PopularThingsData, PopularThingsVars} from "../thing-collection/Interfaces";
import Container from "react-bootstrap/Container";

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
`

interface HomeState {

}

interface HomeProps {

}

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
                <ThingCollection things={data?.popularThings || []}/>
            );
    }
}

export default Home;
