enum Actions {
    // action types
    VERIFY_AUTH = "verifyAuth",
    LOGIN = "login",
    LOGOUT = "logout",
    REGISTER = "register",
    UPDATE_USER = "updateUser",
    FORGOT_PASSWORD = "forgotPassword",
    SET_BREADCRUMB_ACTION = "setBreadcrumbAction",
}

enum Mutations {
    // mutation types

    PURGE_AUTH = "logOut",
    SET_AUTH = "setAuth",
    SET_USER = "setUser",
    SET_PASSWORD = "setPassword",
    SET_ERROR = "setError",
    SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
}

export { Actions, Mutations };
