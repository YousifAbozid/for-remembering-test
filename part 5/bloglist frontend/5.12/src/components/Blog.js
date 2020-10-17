import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, createByUser, user }) => {
  const [showAll, setShowAll] = useState(false)

  const hideWhenShowAll = { display: showAll ? 'none' : '' }
  const showWhenShowAll = { display: showAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    await addLike(blog.id)
  }

  const handleDelete = async () => {
    await deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={hideWhenShowAll}>
          <p>{blog.title} {blog.author} <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view' }
          </button>
          </p>
        </div>
        <div style={showWhenShowAll} >
          <p>{blog.title} <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view' }
          </button>
          </p>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={handleLike} >like</button></p>
          <p>{blog.author}</p>
          { createByUser(blog) && <button onClick={handleDelete}>remove</button> }
        </div>
      </div>
  </div>
)}

export default Blog