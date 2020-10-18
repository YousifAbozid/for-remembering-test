import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleBlogPost = (event) => {
        event.preventDefault()
        createBlog({
          title: title,
          author: author,
          url: url
        })
    
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create New</h2>

            <form onSubmit={handleBlogPost}>
            <div>
                title:
                <input
                id="title"
                type="text"
                value={title}
                name="title"
                onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
                <input
                id="author"
                type="text"
                value={author}
                name="author"
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input
                id="url"
                type="text"
                value={url}
                name="url"
                onChange={handleUrlChange}
                />
            </div>
            <button id="create-button" type="submit">create</button>
            </form>  
        </div>
    )
}

export default BlogForm