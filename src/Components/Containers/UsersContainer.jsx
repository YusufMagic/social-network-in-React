import React from "react";
import {connect} from "react-redux";
import Users from "../Users/Users"
import reloaderPhoto from "../../Common/img/reload.gif"
import userAvatar from "../../Common/img/auto_avatar.jpg"
import {NavLink} from "react-router-dom";

import {
     deleteFollowThunkCreator, addFollowThunkCreator, getUsersThunkCreator
} from "../../redux/reducer/Users-reducer";


class UsersContainerAPI extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let pageCount = Math.ceil(this.props.totalPageCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        const newPages = pages.map(el => <span onClick={() => this.onPageChanged(el)}> {el === this.props.currentPage ?
             <strong>{el}</strong> : el}  </span>)
        const newMas = this.props.users.users.map(el =>
            <div>
             <span>
                <div>
                    <NavLink to={`profile/${el.id}`}><img src={el.photos.small != null ? el.photos.small : userAvatar}/></NavLink>
                </div>
                 <div>
                     {el.followed
                         ? <button disabled={this.props.followingInProgress.some(id => id===el.id)} onClick={() => {
                             this.props.deleteFollowThunkCreator(el.id)
                         }}>Unfollow</button>
                         : <button disabled={this.props.followingInProgress.some(id => id===el.id)} onClick={() => {
                             this.props.addFollowThunkCreator(el.id)
                         }}>Follow</button>}
                 </div>
             </span>
                <span>
                <span>
                    <div>{el.name}</div>
                    <div>{el.id}</div>
                    <div>{el.status}</div>
                </span>
            </span>
            </div>)
        return (<>
                {this.props.isFetch ? null : <img src={reloaderPhoto}/>}
                <div>
                    <Users newMas={newMas} newPages={newPages}/>
                </div>
            </>
        )
    }

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalPageCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetch: state.usersPage.isFetch,
        followingInProgress: state.usersPage.followingInProgress
    }
}

const UserContainer = connect(mapStateToProps, {
    getUsersThunkCreator,
    deleteFollowThunkCreator,
    addFollowThunkCreator
})(UsersContainerAPI)

export default UserContainer
