import {useMutation, useQuery} from '@apollo/client';
import React, {useState} from "react";
import {GetThingByIdData, GetThingByIdVars, SetThingLikeData, SetThingLikeVars, Thing as IThing} from "./interfaces";
import {GQL_GET_THING_BY_ID, GQL_SET_THING_LIKE} from "../../graphql/queries";
import {RouteComponentProps} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

function Thing(props: RouteComponentProps<{ id: string; }>) {
    const [liked, setLiked] = useState<boolean>();

    const GetThingById = useQuery<GetThingByIdData, GetThingByIdVars>(
        GQL_GET_THING_BY_ID,
        {variables: {id: +props.match.params.id},
            onCompleted: response => {
                setLiked(response?.getThingById.is_liked);
            }
        },

    );

    const onLikeClick = (): void => {
        if (GetThingById.data) {
            setLiked(!GetThingById.data.getThingById.is_liked);
            setThingLikeMutation({
                variables: {
                    like: !GetThingById.data.getThingById.is_liked,
                    thing_id: GetThingById.data.getThingById.id
                }
            });
        }
    };

    const [setThingLikeMutation] = useMutation<SetThingLikeData, SetThingLikeVars>(
        GQL_SET_THING_LIKE,
        {
            variables: {
                thing_id: GetThingById.data?.getThingById.id || 0,
                like: !GetThingById.data?.getThingById.is_liked || false
            },
            onCompleted: response => {
                if (response)
                    GetThingById.refetch();
            }
        }
    );

    if (GetThingById.loading) return (<p>Loading...</p>);
    if (GetThingById.error) return (<p>Error!!!</p>);
    if (GetThingById.data) {
        if (!GetThingById.data.getThingById) return (<p>Thing not found...</p>);

        const thing: IThing = GetThingById.data.getThingById;
        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <Image src={thing.preview_image} fluid/>
                    </Col>
                    <Col xs={4}>
                        <ListGroup>
                            <ListGroup.Item onClick={onLikeClick} style={{cursor: "pointer"}}>
                                <img src={liked ?
                                    "https://cdn.thingiverse.com/site/assets/like-button-liked.svg" :
                                    "https://cdn.thingiverse.com/site/assets/like-button-unliked.svg"}
                                     alt="Like side item" className=""/>
                                <span className="pl-2">Like</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p>Thing id = {thing.id} !</p>
                        <p>Thing name = {thing.name} !</p>
                        <p>Thing public_url = {thing.public_url} !</p>
                        <p>Thing like_count = {thing.like_count} !</p>
                        <p>Thing comment_count = {thing.comment_count} !</p>
                        <p>Thing is_liked = {thing.is_liked} !</p>
                        <p>Thing preview_image = {thing.preview_image} !</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Thing;
