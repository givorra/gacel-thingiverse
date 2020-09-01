import {Component} from "react";
import * as React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Thing from "./thing/thing";
import Login from "./login/login";
import LoginCallback from "./login-callback/login-callback";
import Home from "./home/Home";

export default class RouteViewPaths extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/oauth_callback" component={LoginCallback}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/thing" component={Thing}/>
                    <Route exact path="/home" component={Home}/>
                    <Redirect exact path="/" to="/login"/>
                </Switch>
            </BrowserRouter>
        )
    }
}
