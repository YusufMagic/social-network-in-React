import React from "react";
import Header from "../Header/Header";
import {connect} from "react-redux";
import {AuthMeThunkCreator, logout} from "../../redux/reducer/Auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.AuthMeThunkCreator()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { AuthMeThunkCreator, logout })(HeaderContainer)
