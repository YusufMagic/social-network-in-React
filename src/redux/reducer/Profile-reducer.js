import {changeFetch} from "./Users-reducer";
import {profileAPI} from "../../Api/api";

let initialState = {
    posts: [{'message': 'Hello'}, {'message': 'Hi'}],
    profile: null,
    status: ''
}

const addPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST': {
            let stateCopy = {
                ...state,
                posts:[...state.posts]
            }
            stateCopy.posts.push({
                'message': action.message
            })
            return stateCopy
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile:action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status:action.status
            }
        }
        default:
            return state
    }
}

export const setUserProfile = (profile) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    }
}

export const addPost = (text) => {
    return {
        type: 'ADD_POST',
        message: text
    }
}

export const setStatus = (status) => {
    return {
        type:'SET_STATUS',
        status
    }
}

export const getProfileThunkCreator = (id) => {
    return (dispatch) => {
        if (id) {
          dispatch(changeFetch(false))
            profileAPI.getProfile(id)
                .then(data => {
                    dispatch(setUserProfile(data))
                })

        }
    }
}

export const getStatusThunkCreator = (id) => {
    return (dispatch) => {
        profileAPI.getStatus(id).then(data => {
            dispatch(setStatus(data))
        })
    }
}

export const updateStatusThunkCreator = (st) => (dispatch) => {
    profileAPI.updateStatus(st).then(response => {
        dispatch(setStatus(st))
    })
}




export default addPostReducer

