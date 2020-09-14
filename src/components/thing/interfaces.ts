export interface SearchThing {
    total: number;
    things: Thing[];
}

export interface Thing {
    id: number;
    name: string;
    public_url: string;
    like_count: number;
    is_liked: boolean;
    comment_count: number;
    preview_image: string;
}

export interface GetThingByIdData {
    getThingById: Thing;
}

export interface GetThingByIdVars {
    id: number;
}

export interface SetThingLikeVars {
    thing_id: number;
    like: boolean;
}

export interface SetThingLikeData {
    setThingLike: boolean;
}
