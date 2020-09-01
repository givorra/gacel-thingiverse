import * as React from "react";
import {Redirect, useLocation} from "react-router";
import {Thingiverse} from "../login/config";
import {gql, useQuery} from "@apollo/client";

const url = "https://www.thingiverse.com/login/oauth/access_token";

interface GetAccessTokenVars {
    code: string;
}

interface GetAccessTokenData {
    getAccessToken: string;
}

const GET_ACCESS_TOKEN = gql`
    query getAccessToken($code: String!) {
        getAccessToken(code: $code)
    }
`

function LoginCallback(): JSX.Element {
    const state = new URLSearchParams(useLocation().search);
    const code = state.get("code") ? String(state.get("code")) : '';
    console.log("Code = " + code);

    const {loading, error, data} = useQuery<GetAccessTokenData, GetAccessTokenVars>(
        GET_ACCESS_TOKEN,
        {variables: {code: code}}
    );


    if (loading) return (<p>Loading...</p>)
    else {
        if (data && data.getAccessToken) localStorage.setItem("token", data.getAccessToken);
        return (<Redirect to={'/home'}></Redirect>)
    }
}

export default LoginCallback;

