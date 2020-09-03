import * as React from "react";
import {ThingCollectionProps, ThingCollectionState} from "./interfaces";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class ThingCollection extends React.Component<ThingCollectionProps, ThingCollectionState> {
    constructor(props: ThingCollectionProps) {
        super(props);

        this.state = {
            things: this.props.things,
        };
    }

    render(): JSX.Element {
        return (
            <CardGroup>
                {this.state.things.map(thing => (
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <Card className="m-2">
                        <Card.Img variant="top" src={thing.preview_image}/>
                        <Card.Body>
                            <Card.Title>{thing.name}</Card.Title>
                            {/*<Card.Text>*/}
                            {/*    Some quick example text to build on the card title and make up the bulk of*/}
                            {/*    the card's content.*/}
                            {/*</Card.Text>*/}
                        </Card.Body>
                    </Card>
                    </div>
                ))}
            </CardGroup>
        );
    }
}
