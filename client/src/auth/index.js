import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();


// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR_MSG: "ERROR_MSG",
    GUEST_LOGGEDIN: "GUEST_LOGGEDIN"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: "",
        guest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error,
                    guest: auth.guest
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error,
                    guest: auth.guest
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    guest: auth.guest
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error,
                    guest: auth.guest
                })
            }
            case AuthActionType.ERROR_MSG: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: payload.error,
                    guest: auth.guest
                })
            }
            case AuthActionType.GUEST_LOGGEDIN: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    guest: payload.guest
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(err){

        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify, store) {
        try{
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err)
        {
            
            let msg = err.response.data.errorMessage
            authReducer({
                type: AuthActionType.ERROR_MSG,
                payload:{
                    error: msg
                }
            })
        }
    }

    auth.loginUser = async function(email, password, store) {
        try{
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err)
        {
            let e = err;

            let msg = err.response.data.errorMessage
            authReducer({
                type: AuthActionType.ERROR_MSG,
                payload:{
                    error: msg
                }
            })
        }
    }

    auth.closeErrorModal = async function() {
        authReducer({
            type: AuthActionType.ERROR_MSG,
            payload:{
                error: ""
            }
        })
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };