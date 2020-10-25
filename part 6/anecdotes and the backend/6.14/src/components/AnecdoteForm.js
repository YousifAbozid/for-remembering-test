import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showAndHideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        // console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote)) 
        showAndHideNotification(dispatch, `you successfully added ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} >
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm