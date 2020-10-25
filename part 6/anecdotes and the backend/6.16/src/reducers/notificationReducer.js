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

/*
first parameter dispatch to make the function use dispatch because I tried to use it in anecdoteReducer it gave me a nasty error,
second parameter is message, put whatever you want to show, third parameter duration, you should put the time you want to show in seconds,
also I'm using async/await I've noticed that in sometimes notification shows for a lot short time than 5 sec,
so I think it should wait before executing the timeout, after that I didn't notice this behavior again.
*/
export const showAndHideNotification = async (dispatch, message, duration) => {
    await dispatch(showNotification(message))
    setTimeout(() => {
    dispatch(hideNotification())
    }, duration * 1000)
    return
}

const notificationReducer = (state = null, action) => {
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