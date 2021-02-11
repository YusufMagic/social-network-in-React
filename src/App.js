import React, {Component} from 'react'
import './App.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route"
import DialogsContainer from "./Components/Containers/DialogsContainer";
import UserContainer from "./Components/Containers/UsersContainer";
import ProfileContainer from "./Components/Containers/ProfileContainer";
import HeaderContainer from "./Components/Containers/HeaderContainer";
import Login from "./Components/Login/Login";
import {AuthMeThunkCreator} from "./redux/reducer/Auth-reducer";

class App extends React.Component {
    componentDidMount() {
        this.props.AuthMeThunkCreator()
    }

    render () {
        return (<BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="awp-wrapper-content">
                    <Route path='/profile/:idUser?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UserContainer/>}/>
                    <Route path='/login' render={() => <Login />}/>
                </div>
            </div>
        </BrowserRouter>)
    }
}

export default connect(null, {AuthMeThunkCreator})(App)
