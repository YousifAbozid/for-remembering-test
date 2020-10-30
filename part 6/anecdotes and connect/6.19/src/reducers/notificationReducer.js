const showNotification = (message) => {
    return {
      type: 'NOTIFICATION',
      data: {
          message: message
        }
    }
}

const hideNotification = () => {
    return {
      type: 'NOTIFICATION',
      data: {
          message: null
        }
    }
}

export const showAndHideNotification = (message, duration) => {
    return async dispatch => {
      await dispatch(showNotification(message))
      setTimeout(() => {
      dispatch(hideNotification())
      }, duration * 1000)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION' :
            return action.data.message
        default:
            return state
    }
}

export default notificationReducer