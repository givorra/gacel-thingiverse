import * as React from "react";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Col from "react-bootstrap/Col";
import {HomeFilterBarProps} from "./interfaces";

function HomeFilterBar(props: HomeFilterBarProps) {
    const onSelectChange = (event: React.ChangeEvent<any>): any => {
        props.onChangeSort(event.currentTarget.value);
    };

    const onFeaturedChange = (event: React.ChangeEvent<any>): any => {
        props.onChangeFeatured(event.currentTarget.checked);
    };

    return (
        <Row className="bg-light">
            <Col xs={12} md={6} lg={4} xl={3} className="p-2">
                <FormControl as="select" custom onChange={onSelectChange} value={props.sortFilterSelectedIndex}>
                    {props.sortFilters.map(((sortFilter, index) => {
                        return (<option key={index} value={index}>{sortFilter.text}</option>);
                    }))
                    }
                </FormControl>
            </Col>
            <Col xs={12} md={6} lg={4} xl={3} className="p-2">
                <FormGroup controlId="formBasicCheckbox">
                    <FormCheck type="checkbox" label="Featured" onChange={onFeaturedChange}/>
                </FormGroup>
            </Col>
        </Row>
    );
}

export default HomeFilterBar;
