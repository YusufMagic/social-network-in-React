import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    console.log(props)
    return <header className={s.header}>
        <div className={s.auth}>
            <div className={s.authEl}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> : <NavLink to="/login">Login</NavLink>}
            </div>

        </div>
        {console.log(props)}
        <img src="https://demotivation.ru/wp-content/uploads/2020/01/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400-scaled.jpg"/>
    </header>
}

export default Header;
