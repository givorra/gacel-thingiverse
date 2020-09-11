import * as React from "react";
import {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import Thing from "./thing/thing";
import LoginCallback from "./login-callback/login-callback";
import AuthRoute from "./auth-route/auth-route";
import {isLoggedIn} from "../common/helpers";
import {ROUTES} from "../common/consts";

export default class RouteViewPaths extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={ROUTES.oauthCallback} component={LoginCallback}/>
                    <AuthRoute exact path={ROUTES.thing} component={Thing}/>
                    <AuthRoute exact path={ROUTES.home} component={Home}/>
                    {isLoggedIn() ?
                        <Redirect exact path={ROUTES.login} to={ROUTES.home}/>
                        :
                        <Route exact path={ROUTES.login} component={Login}/>
                    }
                    <Redirect exact path="/" to={ROUTES.home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
