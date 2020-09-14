import {gql} from "@apollo/client";

export const GQL_AUTHENTICATION_REDIRECT_URI = gql`
    query AuthenticationRedirectUri {
    authenticationRedirectUrl
  }
`;

export const GQL_SEARCH_THINGS = gql`
    query search($page: Int!, $per_page: Int!, $sort: String!, $query: String, $is_featured: Boolean) {
    searchThings(page: $page, per_page: $per_page, sort: $sort, query: $query, is_featured: $is_featured) {
        total
        things {
            id
            name
            public_url
            like_count
            is_liked
            comment_count
            preview_image
        }
    }
  }
`;

export const GQL_GET_THING_BY_ID = gql`
    query FindThingById($id: ID!) {
    getThingById(id: $id) {
        id
        name
        public_url
        like_count
        is_liked
        comment_count
        preview_image
        description_html
        is_watched
    }
  }
`;

export const GQL_GET_ACCESS_TOKEN = gql`
    query getAccessToken($code: String!) {
        getAccessToken(code: $code)
    }
`;

export const GQL_SET_THING_LIKE = gql`
    mutation setThingLike($thing_id: ID!, $like: Boolean!) {
      setThingLike(thing_id: $thing_id, like: $like)
    }
`;


export const GQL_SET_THING_WATCH = gql`
    mutation setThingWatch($thing_id: ID!, $watch: Boolean!) {
      setThingWatch(thing_id: $thing_id, watch: $watch)
    }
`;
