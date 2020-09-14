import * as React from "react";
import {ThingCollectionProps} from "./interfaces";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./thing-collection.css"
import {useHistory} from "react-router";
import {ROUTES} from "../../common/consts";

function ThingCollection(props: ThingCollectionProps) {
    const history = useHistory();

    const onThingClick = (thingId: number) => {
        let path = ROUTES.thing.replace(":id", "" + thingId);
        history.push(path)
    };

    return (
        <Row className="pb-4 thing-container">
            {
                props.things.length === 0 ?
                    <div className="mx-auto pt-5">
                        <p className="text-center">No results found.</p>
                        <p className="text-center">Please try another search or upload your own design.</p>
                    </div> :
                    props.things.map((thing, index) => (
                        <Col xs={12} md={6} lg={4} xl={3} className="p-4" key={index}>
                            <a style={{cursor: "pointer"}} onClick={() => onThingClick(thing.id)}>
                                <Card className="m-2 mx-auto">
                                    <Card.Header className="text-truncate">{thing.name}</Card.Header>
                                    <Card.Img className="" variant="top" src={thing.preview_image}/>
                                    {/*<Card.Footer className="text-muted">2 days ago</Card.Footer>*/}
                                </Card>
                            </a>
                        </Col>
                    ))}
        </Row>
    );
}

export default ThingCollection;
