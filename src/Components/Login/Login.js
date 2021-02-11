import {Field, reduxForm} from "redux-form"
import {Input} from "../../Common/FormsControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/reducer/Auth-reducer";
import {Redirect} from "react-router-dom";
import s from "../../Common/FormsControls/FormControls.module.css"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder="Login"
                        name={"login"}
                        component={Input}
                        validate={[required]}/></div>
            <div><Field placeholder="Password"
                        name={"password"}
                        component={Input}
                        type={"password"}
                        validate={[required]}/></div>
            <div><Field type="checkbox"
                        name={"rememberMe"}
                        component={Input}
                        validate={[required]}/> remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}

            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <LoginReduxForm onSubmit={onSubmit}/>

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
