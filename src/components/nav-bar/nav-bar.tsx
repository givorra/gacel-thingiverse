import * as React from "react";
import {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./nav-bar.css"
import {NavBarProps} from "./interfaces";

function NavBar(props: NavBarProps) {
    const [searchQuery, setSearchQuery] = useState<string>(props.searchQuery);

    const onKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            props.onEnterKeyDown((event.target as HTMLInputElement).value);
        }
    };

    return (
        <Row className="nav-bar justify-content-start px-2 px-lg-3">
            <Col md={4} className="my-auto text-center d-none d-md-block nav-bar-title">
                <span className="h-100 font-weight-light">Gacel's</span> <span
                className="font-weight-bold">Thingiverse!</span>
            </Col>
            <Col md={8} className="my-auto">
                <Form.Control type="search" placeholder="Search Thingiverse" className="search-control text-white"
                              onKeyDown={onKeyDown} value={searchQuery} onChange={e => setSearchQuery(e.currentTarget.value)}/>
            </Col>
        </Row>
    )
}

export default NavBar;
