import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = (props) => {
    const [name, setName] = useState('')
    const [bornStr, setBornStr] = useState('')

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
          console.log(error)
        }
    })

    if (!props.show) {
        return null
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
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
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