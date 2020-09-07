import * as React from "react";
import {useQuery} from "@apollo/client";
import {GQL_AUTHENTICATION_REDIRECT_URI} from "../../graphql/queries";
import {AthenticationRedirectUrlData} from "./interfaces";

function Login(): JSX.Element {
    const {loading, error, data} = useQuery<AthenticationRedirectUrlData>(GQL_AUTHENTICATION_REDIRECT_URI);

    if (loading) {
        return (<p>Loading...</p>);
    } else if (error) {
        return (<p>Error [{JSON.stringify(error)}]</p>);
    } else {
        return (
            <div>
                <a href={data?.authenticationRedirectUrl}>Login with Thingiverse guy!</a>
            </div>
        );
    }
}

export default Login;
