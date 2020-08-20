import {Component} from "react";
import * as React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Thing from "./thing/thing";
import Authentication from "./authentication/authentication";

export default class RouteViewPaths extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/authorize" component={Authentication}/>
                    <Route exact path="/thing" component={Thing}/>
                    <Redirect exact path="/" to="/authorize"/>
                </Switch>
            </BrowserRouter>
        )
    }
}
