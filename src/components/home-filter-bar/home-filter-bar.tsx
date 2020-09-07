import * as React from "react";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

const sortFilters: string[] = [
    "Popular",
    "Newest",
    "Relevant",
    "Text",
    "Makes"
];

interface HomeFilterBarProps {
    onChangeSort(sort: string): void
}

function HomeFilterBar(props: HomeFilterBarProps) {
    const onSelectChange = (event: React.ChangeEvent<any>): any => {
        props.onChangeSort(event.currentTarget.value);
    };

    return (
        <Row className="bg-light">
            <Col xs={12} md={6} lg={4} xl={3} className="p-2">
                <FormControl as="select" custom onChange={onSelectChange}>
                    {sortFilters.map(((value, index) => {
                        return (<option defaultChecked={index === 0} key={index} value={value.toLowerCase()}>{value}</option>);
                    }))
                    }
                </FormControl>
            </Col>
        </Row>
    );
}

export default HomeFilterBar;
