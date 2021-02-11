import {userAPI} from "../../Api/api";


let initState = {
    users:[],
    pageSize: 5,
    totalUsersCount: 200,
    currentPage: 1,
    isFetch: false,
    followingInProgress: []
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el,  followed: true}
                    }
                    return el
                })
            }
        }
        case 'UNFOLLOW': {
           return {
               ...state,
               users: state.users.map( el => {
                   if (el.id === action.userId) {
                       return {...el,  followed:false}
                   }
                   return el
               })
           }
        }

        case 'SET_USERS': {
            return {
                ...state,
                users:action.users
            }
        }

        case 'CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'CHANGE_RELOADER': {
            return {
                ...state,
                isFetch: action.isFetch
            }
        }

        case 'CHANGE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }


        case 'C_TOTAL_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        default:
            return state
    }
}

export const changeFetch = (isFetch) => {
    return {
        type:'CHANGE_RELOADER',
        isFetch:isFetch
    }
}

export const changeTotalCount = (totalPageCount) => {
    return {
        type:"C_TOTAL_COUNT",
        totalUsersCount: totalPageCount
    }
}

export const setUsers = (mas) => {
    return({
        type:'SET_USERS',
        users: mas
    })
}

export const setCurrentPage = (currentPage) => {
    return {
        type:'CURRENT_PAGE',
        currentPage:currentPage
    }
}

export const changeFollowingProgress = (isFetching, userId) => {
    return {
        type: "CHANGE_IS_FOLLOWING_PROGRESS",
        isFetching, userId
    }
}

export const  followedUser = (id) => {
    return {
        type:'FOLLOW',
        userId: id
    }
}

export const  unfollowedUser = (id) => {
    return {
        type:'UNFOLLOW',
        userId: id
    }
}


export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(changeFetch(false))
        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(changeFetch(true))
                dispatch(setCurrentPage(currentPage))
                // dispatch(changeTotalCount(data.count))
                dispatch(setUsers(data.items))
            })
   }
}

export const deleteFollowThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(changeFollowingProgress(true, id))
        userAPI.deleteFollow(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowedUser(id))
                    dispatch(changeFollowingProgress(false, id))
                }
            })
    }
}

export const addFollowThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(changeFollowingProgress(true, id))
        userAPI.postFollow(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followedUser(id))
                    dispatch(changeFollowingProgress(false, id))
                }
            })
    }
}



export default usersReducer
