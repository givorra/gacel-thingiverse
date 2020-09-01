import * as React from "react";
import {Thingiverse} from "./config";

const clientID = "ae78d6c71cf7f968065f";
const redirectURI = "http://localhost:3000/oaut_callback";
const scope = "code";

function Login(): JSX.Element {
    const qParams = [
        `redirect_uri=${Thingiverse.REDIRECT_URI}`,
        `response_type=${Thingiverse.RESPONSE_TYPE}`,
        `client_id=${Thingiverse.CLIENT_ID}`,
    ].join("&");

    return (
        <div>
            <a href={`https://www.thingiverse.com/login/oauth/authorize?${qParams}`}>Login with Thingiverse guy!</a>
        </div>
    )
}

export default Login;
