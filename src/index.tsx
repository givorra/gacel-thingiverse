import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AppContainer>
                <App/>
            </AppContainer>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
