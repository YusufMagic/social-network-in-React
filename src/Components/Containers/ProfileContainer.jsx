import React from "react";
import {connect} from "react-redux";
import Profile from "../Profile/Profile";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator
} from "../../redux/reducer/Profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        profile: state.portfolioPage.profile,
        status: state.portfolioPage.status,
        authorizedUseId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}


class ProfileContainerAPI extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const ProfileRedirect = AuthRedirect(Profile)
        return <div>
            <ProfileRedirect {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusThunkCreator}/>
        </div>
    }

    componentDidMount() {
        let userId = this.props.match.params.idUser
        if (!userId) {
            userId = 14693
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }
}


export default compose(
    connect(mapStateToProps, {getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator}),
    withRouter
)(ProfileContainerAPI)
