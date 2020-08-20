import React from 'react';
import './App.css';
import {AppContainer} from "react-hot-loader";
import RouteViewPaths from "./components/route-views-path";

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";


export const link = createHttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
        authorization: localStorage.getItem('token'),
    },
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});


function App() {
    return (
        <ApolloProvider client={client}>
            <AppContainer>
                <RouteViewPaths/>
            </AppContainer>
        </ApolloProvider>
    );
}

export default App;
