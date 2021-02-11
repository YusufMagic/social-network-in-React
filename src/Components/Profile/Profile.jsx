import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostContainer from "../Containers/PostContainer";
import React from "react";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <div className={s.posts}>
                <PostContainer />
            </div>
        </div>
    )
}

export default Profile
