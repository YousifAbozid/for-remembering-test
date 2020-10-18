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

  /* A little notice, if you are testing the component you should remove the braces in createByUser function from this line
  like this === { createByUser(blog) && <button onClick={handleDelete}>remove</button> } ===
  become ==> === { createByUser && <button onClick={handleDelete}>remove</button> } ===
  because the test can't see that it refers to a function which we defiend in the App.js file and passed it as a parameter.
  Once you remove the braces the tests will work perfectly, after that you can return everything as it was before to make the button
  works as expected, and to fix this bug forever I have a solution in my mind, simply you can pass user variable as a parameter from App.js file
  to this component, and also move createByUser function from App.js to this component as well, and leave this line
  === { createByUser(blog) && <button onClick={handleDelete}>remove</button> } ===
  as it is, I guess this will solve this bug :)
  */

  /*
  make the text view of the second button to man to be different from the first button,
  then return man to view after finish testing. P.S: I hate testing :(
  */

  return (
    <div style={blogStyle}>
      <div id="blog" >
        <div className='short-details' style={hideWhenShowAll}>
          <p>{blog.title} {blog.author} <button className="full-details-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view' }
          </button>
          </p>
        </div>
        <div style={showWhenShowAll} >
          <p>{blog.title} <button className='short-details' onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view' }
          </button>
          </p>
          <p>{blog.url}</p>
          <p>{blog.likes} <button id='like-blog' onClick={handleLike} >like</button></p>
          <p>{blog.author}</p>
          { createByUser(blog) && <button onClick={handleDelete}>remove</button> }
        </div>
      </div>
  </div>
)}

export default Blog