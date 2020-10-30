const initialNotificationObject = {
    notification: null,
    timeoutID: null
}

const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            message: message
        }
    }
}

const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: {
            message: null
        }
    }
}

const setTimeoutAction = (timeoutID) => ({
    type: 'SET_TIMEOUT_ID',
    data: timeoutID
})

export const showAndHideNotification = (message, duration) => {
    return async dispatch => {
        dispatch(showNotification(message))
        const timeoutID = setTimeout(() => {
        dispatch(hideNotification())
        }, duration * 1000)
        dispatch(setTimeoutAction(timeoutID))
    }
}

// bug is fixed now :)
const notificationReducer = (state = initialNotificationObject, action) => {
    switch (action.type) {
        case 'SET_TIMEOUT_ID':
            return {
                notification: state.notification,
                timeoutID: action.data
            }
        case 'SHOW_NOTIFICATION':
            if (state.timeoutID) {
                clearTimeout(state.timeoutID)
            }
            return {
                notification: action.data.message,
                timeoutID: null
            }
        case 'HIDE_NOTIFICATION':
            return {
                notification: null,
                timeoutID: null
            }
        default:
            return state
    }
}

export default notificationReducer