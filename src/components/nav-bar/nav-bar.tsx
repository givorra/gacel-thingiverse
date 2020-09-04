import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./nav-bar.css"

interface NavBarProps {
    onEnterKeyDown(query: string): void | undefined
}

function NavBar(props: NavBarProps) {

    const onKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            props.onEnterKeyDown((event.target as HTMLInputElement).value);
        }
    };

    return (
        <Row className="nav-bar justify-content-start px-2 px-lg-3">
            <Col md={4} className="my-auto text-center d-none d-md-block nav-bar-title">
                <span className="h-100 font-weight-light">Gacel's</span> <span className="font-weight-bold">Thingiverse!</span>
            </Col>
            <Col md={8} className="my-auto">
                <Form.Control type="search" placeholder="Search Thingiverse" className="search-control text-white" onKeyDown={onKeyDown}/>
            </Col>
        </Row>
    )
}

export default NavBar;
