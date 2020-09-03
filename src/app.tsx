import React from 'react';
import './app.css';
import {AppContainer} from "react-hot-loader";
import RouteViewPaths from "./components/route-views-path";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./graphql/client";


function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <AppContainer>
                <RouteViewPaths/>
            </AppContainer>
        </ApolloProvider>
    );
}

export default App;
