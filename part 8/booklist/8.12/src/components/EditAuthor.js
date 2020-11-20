import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = (props) => {
    const [name, setName] = useState('')
    const [bornStr, setBornStr] = useState('')
    const allAuthors = useQuery(ALL_AUTHORS)
    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
          console.log(error)
        }
    })

    if (!props.show) {
        return null
    }

    const options = () => {
        let authors = allAuthors.data.allAuthors.map((author) => {
            return <option value={author.name} label={author.name}></option>
        })

        return authors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let setBornTo = parseInt(bornStr)

        await editAuthor({ variables: { name, setBornTo } })

        setName('')
        setBornStr('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                name
                <select onChange={({ target }) => setName(target.value)}>
                    <option value="" label="select an author"></option>
                    { options() }
                </select>
                <div>
                    born
                    <input
                        value={bornStr}
                        onChange={({ target }) => setBornStr(target.value)}
                    />
                </div>
                <button type='submit'>edit author</button>
            </form>
        </div>
    )
}

export default EditAuthor