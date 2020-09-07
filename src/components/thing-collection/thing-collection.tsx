import * as React from "react";
import {ThingCollectionProps, ThingCollectionState} from "./interfaces";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./thing-collection.css"

export class ThingCollection extends React.Component<ThingCollectionProps, ThingCollectionState> {
    constructor(props: ThingCollectionProps) {
        super(props);

        this.state = {
            things: this.props.things,
        };
    }

    render(): JSX.Element {
        return (
            <Row className="bg-light">
                {this.state.things.map((thing, index) => (
                    <Col xs={12} md={6} lg={4} xl={3} className="p-2" key={index}>
                        <Card className="m-2 h-100 mx-auto">
                            <Card.Header className="text-truncate">{thing.name}</Card.Header>
                            <Card.Img className="" variant="top" src={thing.preview_image}/>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }
}
