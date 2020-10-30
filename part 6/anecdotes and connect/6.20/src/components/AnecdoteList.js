import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showAndHideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    return (
        <div>
            {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        props.vote(anecdote.id)
                        props.showAndHideNotification(`you voted "${anecdote.content}"`, 5)
                    }}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = ({ anecdotes, filter }) => {
    return {
        anecdotes: anecdotes
            .filter(anecdote => anecdote.content.toLowerCase()
                .includes(filter.toLowerCase()))
    }
}
  
const mapDispatchToProps = {
    vote, showAndHideNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)