import {applyMiddleware, combineReducers, createStore} from "redux";
import addPostReducer from "./reducer/Profile-reducer";
import dialogReducer from "./reducer/Dialogs-reducer";
import usersReducer from "./reducer/Users-reducer";
import authReducer from "./reducer/Auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'


let reducers = combineReducers({
    portfolioPage: addPostReducer,
    messagePage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store


