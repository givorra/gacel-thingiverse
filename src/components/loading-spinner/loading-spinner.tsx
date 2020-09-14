import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import * as React from "react";

function LoadingSpinner() {
    return (
        <Row className="p-5 text-center">
            <Col xs={12}><Spinner animation="border" role="status"/><span className="pl-3">Loading...</span></Col>
        </Row>
    );
}

export default LoadingSpinner;
