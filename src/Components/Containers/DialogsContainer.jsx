import {addMessage} from "../../redux/reducer/Dialogs-reducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";
import {AuthRedirect} from "../../hoc/AuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {addMessage})(AuthRedirect(Dialogs))
