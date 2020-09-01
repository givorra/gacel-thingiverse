import {useQuery, gql, ApolloError} from '@apollo/client';
import React from "react";
import logo from "../../logo.svg";
import {GetThingByIdData, GetThingByIdVars} from "./interfaces";

const GET_THING_BY_ID = gql`
    query FindThingById($id: ID!) {
    getThingById(id: $id) {
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

function showMessage(loading: boolean, error: ApolloError | undefined, data: any): JSX.Element {
    if (loading)
        return (<p>Loading...</p>)
    if (error)
        return (<p>Error!!!</p>)
    if (data && data.getThingById)
        return (
            <div>
                <p>Thing id = {data.getThingById.id} !</p>
                <p>Thing name = {data.getThingById.name} !</p>
                <p>Thing public_url = {data.getThingById.public_url} !</p>
                <p>Thing like_count = {data.getThingById.like_count} !</p>
                <p>Thing comment_count = {data.getThingById.comment_count} !</p>
                <p>Thing is_liked = {data.getThingById.is_liked} !</p>
                <p>Thing preview_image = {data.getThingById.preview_image} !</p>
            </div>
        )
    return (<p></p>);
}

function Thing(): JSX.Element {

    const {loading, error, data} = useQuery<GetThingByIdData, GetThingByIdVars>(
        GET_THING_BY_ID,
        {variables: {id: 1762299}}
    );

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                {showMessage(loading, error, data)}
            </header>
        </div>
    )
}

export default Thing;
