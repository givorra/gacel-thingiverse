import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {ACCESS_TOKEN_VAR} from "../common/consts";
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(ACCESS_TOKEN_VAR);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_API_URL}`
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});
