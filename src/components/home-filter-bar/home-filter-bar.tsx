import * as React from "react";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import {SortFilter} from "../home/interfaces";


interface HomeFilterBarProps {
    onChangeSort(sort: number): void,

    sortFilters: SortFilter[],
    sortFilterSelectedIndex: number
}

function HomeFilterBar(props: HomeFilterBarProps) {
    const onSelectChange = (event: React.ChangeEvent<any>): any => {
        props.onChangeSort(event.currentTarget.value);
    };

    return (
        <Row className="bg-light">
            <Col xs={12} md={6} lg={4} xl={3} className="p-2">
                <FormControl as="select" custom onChange={onSelectChange}>
                    {props.sortFilters.map(((sortFilter, index) => {
                        return (<option selected={index === props.sortFilterSelectedIndex} key={index}
                                        value={index}>{sortFilter.text}</option>);
                    }))
                    }
                </FormControl>
            </Col>
        </Row>
    );
}

export default HomeFilterBar;
