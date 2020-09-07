import * as React from "react";
import {Redirect, useLocation} from "react-router";
import {useQuery} from "@apollo/client";
import {GQL_GET_ACCESS_TOKEN} from "../../graphql/queries";

interface GetAccessTokenVars {
    code: string;
}

interface GetAccessTokenData {
    getAccessToken: string;
}

function LoginCallback(): JSX.Element {
    const state = new URLSearchParams(useLocation().search);
    const code = state.get("code") ? String(state.get("code")) : '';
    console.log("Code = " + code);

    const {loading, error, data} = useQuery<GetAccessTokenData, GetAccessTokenVars>(
        GQL_GET_ACCESS_TOKEN,
        {variables: {code: code}}
    );

    if (loading) return (<p>Loading...</p>);
    else if (error) return (<p>{JSON.stringify(error)}</p>);
    else {
        if (data && data.getAccessToken) localStorage.setItem("token", data.getAccessToken);
        return (<Redirect to={'/home'}/>)
    }
}

export default LoginCallback;

