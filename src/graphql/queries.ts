import {gql} from "@apollo/client";

export const AUTHENTICATION_REDIRECT_URI = gql`
    query AuthenticationRedirectUri {
    authenticationRedirectUrl
  }
`;
