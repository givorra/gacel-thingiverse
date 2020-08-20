import {Component} from "react";
import * as React from "react";
import {useLocation} from "react-router";

const clientID = "ae78d6c71cf7f968065f";
// const redirectURI = "http://google.com";
const redirectURI = "http://localhost:3000/authorize";

function ShowAuthorize() {
    let state = new URLSearchParams(useLocation().search);
    if(!state.get("code")) {
        window.location.href = `https://www.thingiverse.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    }
    return (<section>Code = {state.get("code")}</section>)
    // return (<p>Authentication</p>)
}

class Authentication extends Component<any, any> {
    constructor( props: any ){
        super(props);
        this.state = {};
    }

    render() {
        return (<ShowAuthorize/>);
    }
}

export default Authentication;
