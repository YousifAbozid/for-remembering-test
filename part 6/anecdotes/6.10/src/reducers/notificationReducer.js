const notificationReducer = (state = 'Hi :)', action) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch (action.type) {
        case 'NOTIFICATION' :
            return action.data.message
        default:
            return state
    }
}

export default notificationReducer