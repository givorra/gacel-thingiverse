import {useQuery, gql, ApolloError} from '@apollo/client';
import React from "react";
import logo from "../../logo.svg";

interface Thing {
    id: number;
}

interface GetThingByIdData {
    getThingById: Thing;
}

interface GetThingByIdVars {
    id: number;
}

const GET_THING_BY_ID = gql`
    query FindThingById($id: ID!) {
    getThingById(id: $id) {
      id
    }
  }
`

function showMessage(loading: boolean, error: ApolloError | undefined, data: any): JSX.Element {
    if (loading)
        return (<p>Loading...</p>)
    if (error)
        return (<p>Error!!!</p>)
    if (data && data.getThingById)
        return (<p>Thing id = {data.getThingById.id} !</p>)
    return (<p></p>);
}

function Thing(): JSX.Element{

    const {loading, error, data} = useQuery<GetThingByIdData, GetThingByIdVars>(
        GET_THING_BY_ID,
        {variables: {id: 1}}
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
