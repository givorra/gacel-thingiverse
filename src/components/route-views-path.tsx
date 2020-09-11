import * as React from "react";
import {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import Thing from "./thing/thing";
import LoginCallback from "./login-callback/login-callback";
import AuthRoute from "./auth-route/auth-route";
import {isLoggedIn} from "../common/helpers";

export default class RouteViewPaths extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/oauth_callback" component={LoginCallback}/>
                    <AuthRoute exact path="/thing" component={Thing}/>
                    <AuthRoute exact path="/home" component={Home}/>
                    {isLoggedIn() ?
                        <Redirect exact path="/login" to="/home"/>
                        :
                        <Route exact path="/login" component={Login}/>
                    }
                    <Redirect exact path="/" to="/home"/>
                </Switch>
            </BrowserRouter>
        )
    }
}
