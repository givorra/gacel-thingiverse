import {ACCESS_TOKEN_VAR} from "./consts";

export function isLoggedIn(): boolean {
    return (localStorage.getItem(ACCESS_TOKEN_VAR) !== null)
}
