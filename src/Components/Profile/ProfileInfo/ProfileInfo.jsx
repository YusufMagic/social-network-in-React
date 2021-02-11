import s from "./ProfileInfo.module.css";
import loader from "../../../Common/img/reload.gif"
import ProfileStatus from "./ProfileStatus";
import React from "react";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <img src={loader}/>
    }
    return (
        <div>
            <img src="https://demotivation.ru/wp-content/uploads/2020/01/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400-scaled.jpg"/>
            <div className={s.descriptionBlock}>
                {props.profile.userId!==14693}
                <img src={props.profile.data.photos.small}/>
                <h1>{props.profile.data.fullName}</h1>
                <h3>{props.status}</h3>
                <h1>{props.profile.data.userId}</h1>
                {props.profile.userId===14693}
                <ProfileStatus profile={props.profile.data} status={props.status}   updateStatus={props.updateStatus}/>
                ava+description
            </div>
        </div>

    )
}

export default ProfileInfo
