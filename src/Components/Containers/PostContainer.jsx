import React from 'react'
import MyPost from '../Profile/MyPost/MyPost'
import {addPost} from "../../redux/reducer/Profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.portfolioPage
    }
}

export default connect(mapStateToProps, {addPost})(MyPost)
