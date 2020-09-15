import * as React from "react";
import {useQuery} from "@apollo/client";
import {GQL_AUTHENTICATION_REDIRECT_URI} from "../../graphql/queries";
import {AthenticationRedirectUrlData} from "./interfaces";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Login(): JSX.Element {
    const {loading, error, data} = useQuery<AthenticationRedirectUrlData>(GQL_AUTHENTICATION_REDIRECT_URI);

    if (loading) {
        return (<p>Loading...</p>);
    } else if (error) {
        return (<p>Error [{JSON.stringify(error)}]</p>);
    } else {
        return (
            <Container>
                <Row>
                    <div className="mx-auto pt-5">
                        <h1 className="text-center">¡Welcome to Gacel's Thingiverse!</h1>
                    </div>
                </Row>
                <Row>
                    <div className="mx-auto pt-5">
                        <p className="text-center">Please, login to Thingivierse to continue</p>
                    </div>
                </Row>
                <Row>
                    <div className="mx-auto pt-2">
                        <a href={data?.authenticationRedirectUrl}><Button className="text-center">Login with
                            Thingiverse</Button></a>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default Login;
