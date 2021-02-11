import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            {props.post}
            <button>like</button>
        </div>
    )
}

export default Post
