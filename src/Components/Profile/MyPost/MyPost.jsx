import s from './MyPost.module.css'
import Post from "../Post/Post";
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Textarea} from "../../../Common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

let maxLength30 = maxLengthCreator(30)

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Enter text post's"} component={Textarea} name={"post"} validate={[required, maxLength30]}/>
            </div>

            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({form:"posts"})(PostForm)

const MyPost = (props) => {
    const newPost = props.posts.posts.map(el => <Post post={el.message} key={el.message}/>)  //Нужен id for key

    const onSubmit = (formData) => {
        props.addPost(formData.post)
    }

    return (
        <div className={s.postBlock}>
            <h2>My Post</h2>
            <div>
               <PostReduxForm onSubmit={onSubmit}/>
            </div>
            <div className={s.posts}>
                {newPost}
            </div>
        </div>
    )
}

export default MyPost
