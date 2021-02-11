import s from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from "./Message/Message";
import React from "react";
import {Field, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormControls";

let maxLength10 = maxLengthCreator(10)

const DialogForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Send message"} component={Textarea} name={"message"} validate={[required, maxLength10]}/>
            </div>

            <div>
                <button>Add post</button>
            </div>
        </form>

    )
}

const DialogReduxForm = reduxForm({form: 'dialogs'})(DialogForm)

const Dialogs = (props) => {

    const newDialogs = props.dialogs.dialogs.map(el => <Dialog name={el.name} id={el.id} key={el.id}/>)
    const newMessages = props.dialogs.messages.map(el => <Message message={el.message} key={el.messages}/>)

    const onSubmit = (formData) => {
        props.addMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {newDialogs}
            </div>
            <div className={s.messages}>
                {newMessages}
                <DialogReduxForm {...props} onSubmit={onSubmit} />
            </div>

        </div>
    )
}

export default Dialogs
