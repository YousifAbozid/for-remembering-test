import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [message, setMessage] = useState({ content: '', success: null })
  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users )
    )
  }, [])

  const showMessage = (content, success) => {
    setMessage({ content, success })
    resetMessage(5000)
  
  }
  
  const resetMessage = (duration) => {
      setTimeout(() => {
          setMessage({ content: '', success: null })
      }, duration)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
      username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage("wrong username or password :(", false)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear() // or you can use "window.localStorage.clear()" to clear localstorage completely 
    window.location.reload(true) // this reload the whole page if set to true "window.location.reload(true)", the default is false
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleBlogPost = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    
    const currentUser = users.filter( u => u.username === user.username)
    // console.log("currentUser is:", currentUser)
    // console.log("blogObject is:", blogObject)
    blogObject["userId"] = currentUser[0].id
  
    blogService.setToken(user.token)
    blogService
      .create(blogObject)
      .then( returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added :)`, true)
      })
      .catch( error => {
        showMessage("sorry, can't add this blog", false)
      })
  }

  const addLike = async (blogId) => {
    // first find the blog
    const blogToUpdate = blogs.find(blog => blog.id === blogId)
    // console.log(blogToUpdate)

    // save to the backend
    blogToUpdate["likes"] = blogToUpdate.likes + 1
    // console.log(blogToUpdate)
    const updatedBlog = await blogService.likeBlog(blogId, blogToUpdate)
    // console.log(updatedBlog)

    // if successful save to the frontend
    if (updatedBlog) {
       await blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }

  /*
  it works like a dream, try to add console.log to see the value of a and b when you pass a list of objects in it.
  it sorts the objects by it's value and return the list of objects sorted in counting up if the values are numbers.
  you can see the docs here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  */
  const sortedBlogs = (blogs) => {
    return blogs.sort( (a, b) => a.likes - b.likes)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleBlogPost} />
    </Togglable>
  )

  const deleteBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      // removing from the backend
      const removedBlog = await blogService.deleteBlog(blogToRemove.id)
      
      /*
      if successful update the frontend.
      I'm using (!removedBlog) because the backend sends no content after successful deletion.
      (!removedBlog) === true
      */
      if (!removedBlog) {
        await blogService.getAll().then(blogs => setBlogs(blogs))
      }
    }
  }

  /*
  For now this code is working perfectly and shows remove button only to the user who create the blog as the instructions said,
  but I noticed some kind of bug when creating new blog, remove button doesn't show unless refresh the page,
  so in order to fix this bug you need to update the frontend somehow after creating new blog, I can give you
  a hint how to fix it, use async/await in handleBlogPost function and setBlogs with in line of code like this
  await blogService.getAll().then(blogs => setBlogs(blogs))
  I guess maybe this fix the bug.
  */
  const createByUser = (blog) => {
    return blog.user[0].username === user.username
  }

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        {message.content ? <Notification message={message} /> : null}
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {message.content ? <Notification message={message} /> : null}
      <p>{user.name} logged-in<button type="submit" onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {sortedBlogs(blogs).map(blog =>
        <Blog key={blog.id} blog={blog}
        addLike={addLike}
        deleteBlog={deleteBlog}
        createByUser={createByUser}
        user={user} />
      )}
    </div>
  )
}

export default App