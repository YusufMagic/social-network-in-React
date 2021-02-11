import {AuthAPI} from "../../Api/api";
import {changeFetch} from "./Users-reducer";
import {connect} from "react-redux";
import {stopSubmit} from "redux-form";

let initState = {
    userId: null,
    email: null,
    login: null,
    isFetch: false,
    isAuth: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        }

        default:
            return state
    }
}


export const setUserData = (id,login,email, isAuth) => {
    return {
        type:  'SET_USER_DATA',
        data: {id:id, email:email, login:login},
        isAuth: isAuth
    }
}



export const AuthMeThunkCreator = () => {
    return (dispatch) => {
       dispatch(changeFetch(false))
        AuthAPI.AuthMe()
            .then(data => {
                if (data.data.resultCode === 0) {
                    let {id, login, email} = data.data.data
                    dispatch(setUserData(id,login,email, true))
                }
            })
    }
}

export const login = (email, password, rememberMe) => (dispatch) => {
    AuthAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(AuthMeThunkCreator())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        })
}

export const logout = () => (dispatch) => {
    AuthAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}


export default authReducer
