import {useMutation, useQuery} from '@apollo/client';
import React, {useState} from "react";
import {
    GetThingByIdData,
    GetThingByIdVars,
    SetThingLikeData,
    SetThingLikeVars,
    SetThingWatchData,
    SetThingWatchVars,
    Thing as IThing
} from "./interfaces";
import {GQL_GET_THING_BY_ID, GQL_SET_THING_LIKE, GQL_SET_THING_WATCH} from "../../graphql/queries";
import {RouteComponentProps, useHistory} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import NavBar from "../nav-bar/nav-bar";
import {ROUTES} from "../../common/consts";
import "./thing.css";
import LoadingSpinner from "../loading-spinner/loading-spinner";

function Thing(props: RouteComponentProps<{ id: string; }>) {
    const [liked, setLiked] = useState<boolean>();
    const [watched, setWatched] = useState<boolean>();
    const history = useHistory();

    // ***************** HANDLERS *******************

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

    const onWatchClick = (): void => {
        if (GetThingById.data) {
            setWatched(!GetThingById.data.getThingById.is_watched);
            setThingWatchMutation({
                variables: {
                    watch: !GetThingById.data.getThingById.is_watched,
                    thing_id: GetThingById.data.getThingById.id
                }
            });
        }
    };

    const onCopyLinkClick = () => {
        navigator.clipboard.writeText(window.location.href)
            .catch(error => console.error(error));
    };

    const onNavBarEnterKeyDown = (query: string): void => {
        history.push({
            pathname: ROUTES.home,
            state: {
                searchQuery: query
            }
        })
    };

    // ******************** APOLLO HOOKS ******************

    const GetThingById = useQuery<GetThingByIdData, GetThingByIdVars>(
        GQL_GET_THING_BY_ID,
        {
            variables: {id: +props.match.params.id},
            onCompleted: response => {
                setLiked(response?.getThingById.is_liked);
                setWatched(response?.getThingById.is_watched);
            }
        },
    );

    const [setThingLikeMutation] = useMutation<SetThingLikeData, SetThingLikeVars>(
        GQL_SET_THING_LIKE,
        {
            variables: {
                thing_id: GetThingById.data?.getThingById.id || 0,
                like: !GetThingById.data?.getThingById.is_liked || false
            },
            onCompleted: response => {
                if (response) {
                    GetThingById.refetch();
                }
            }
        }
    );

    const [setThingWatchMutation] = useMutation<SetThingWatchData, SetThingWatchVars>(
        GQL_SET_THING_WATCH,
        {
            variables: {
                thing_id: GetThingById.data?.getThingById.id || 0,
                watch: !GetThingById.data?.getThingById.is_watched || false
            },
            onCompleted: response => {
                if (response){
                    GetThingById.refetch();
                }
            }
        }
    );

    const renderThing = () => {
        if (GetThingById.loading) {
            return (<LoadingSpinner/>);
        }
        else if (GetThingById.error) {
            return (<div>Error!!!</div>);
        } else if (GetThingById.data) {
            if (!GetThingById.data.getThingById) {
                return (<div>Thing not found...</div>);
            } else {
                const thing: IThing = GetThingById.data.getThingById;
                return (
                    <Container className="p-xs-2 p-lg-3">
                        <Row className="py-3">
                            <Col xs={12}>
                                <h1>{thing.name}</h1>
                            </Col>
                        </Row>
                        <Row className="py-4">
                            <Col xs={12} md={8} className="py-2">
                                <Image src={thing.preview_image} fluid/>
                            </Col>
                            <Col xs={12} md={4} className="py-2">
                                <ListGroup>
                                    <ListGroup.Item onClick={onLikeClick} style={{cursor: "pointer"}}>
                                        <img src={liked ?
                                            "https://cdn.thingiverse.com/site/assets/like-button-liked.svg" :
                                            "https://cdn.thingiverse.com/site/assets/like-button-unliked.svg"}
                                             alt="Like side item"/>
                                        <span className="pl-2">Like</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={onWatchClick} style={{cursor: "pointer"}}>
                                        <img src={watched ?
                                            "https://cdn.thingiverse.com/site/assets/watch-button-watched.svg" :
                                            "https://cdn.thingiverse.com/site/assets/watch-button-unwatched.svg"}
                                             alt="Watch side item"/>
                                        <span className="pl-2">Watch</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={onCopyLinkClick} style={{cursor: "pointer"}}>
                                        <img src={"https://cdn.thingiverse.com/site/assets/copy-link.svg"}
                                             alt="Copy clipboard side item"/>
                                        <span className="pl-2">Copy Link</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="thing-content" className="bg-white py-2 thing-description">
                                <h2>Summary</h2>
                                <div dangerouslySetInnerHTML={{__html: thing.description_html}}/>
                            </Col>
                        </Row>
                    </Container>
                );
            }
        } else {
            return null;
        }
    };

        return (
            <div>
                <Container fluid>
                    <NavBar onEnterKeyDown={onNavBarEnterKeyDown} searchQuery=""/>
                </Container>
                {
                    renderThing()
                }
            </div>
        );

}

export default Thing;
