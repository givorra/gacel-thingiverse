import React from "react";
import {Redirect, Route} from "react-router";
import {isLoggedIn} from "../../common/helpers";

function AuthRoute(props: any) {
    if (!isLoggedIn()) {
        return <Redirect to="/login"/>;
    }
    return <Route {...props} />;
}

export default AuthRoute;
