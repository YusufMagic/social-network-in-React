let initialState = {

    dialogs: [{'id': '1', 'name': 'Yusuf'}, {'id': '2', 'name': 'Volody'}, {'id': '3', 'name': 'Victor'}],
    messages: [{'message': 'Hi'}, {'message': 'Hi'}, {'message': 'Hi'}]

}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            let stateCopy = {
                ...state,
                messages:[...state.messages]
            }
            stateCopy.messages.push({
                'message': action.message
            })
            return stateCopy
        }
        default:
            return state
    }
}

export const addMessage = (text) => {
    return {
        type: 'ADD_MESSAGE',
        message: text
    }
}


export default dialogReducer
