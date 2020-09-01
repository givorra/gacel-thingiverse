import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";

const link = createHttpLink({
    uri: `${process.env.REACT_APP_API_HOST}/graphql`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});
