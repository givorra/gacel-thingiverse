import {useQuery} from '@apollo/client';
import React from "react";
import {GetThingByIdData, GetThingByIdVars} from "./interfaces";
import {GQL_GET_THING_BY_ID} from "../../graphql/queries";
import {RouteComponentProps} from "react-router";

function Thing(props: RouteComponentProps<{ id: string; }>): JSX.Element {
    const {loading, error, data} = useQuery<GetThingByIdData, GetThingByIdVars>(
        GQL_GET_THING_BY_ID,
        {variables: {id: +props.match.params.id}}
    );

    return (
        <div>
            {(loading) ?
                    <p>Loading...</p> :
                    (error) ?
                        <p>Error!!!</p> :
                        (data && data.getThingById) ?
                            <div>
                                <p>Thing id = {data.getThingById.id} !</p>
                                <p>Thing name = {data.getThingById.name} !</p>
                                <p>Thing public_url = {data.getThingById.public_url} !</p>
                                <p>Thing like_count = {data.getThingById.like_count} !</p>
                                <p>Thing comment_count = {data.getThingById.comment_count} !</p>
                                <p>Thing is_liked = {data.getThingById.is_liked} !</p>
                                <p>Thing preview_image = {data.getThingById.preview_image} !</p>
                            </div>
                            :
                            null
            }
        </div>
    )
}

export default Thing;
