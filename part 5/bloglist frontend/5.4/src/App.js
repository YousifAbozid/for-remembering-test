import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ content: '', success: null })

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    // console.log(user)
    const currentUser = users.filter( u => u.username === user.username)
    // console.log(currentUser)
    const blogObject = {
      title: title,
      author: author,
      url: url,
      userId: currentUser[0].id
    }

    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      showMessage(`a new blog ${title} by ${author} added :)`, true)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      showMessage("sorry, can't add this blog", false)
    }
  }

  const blogForm = () => (
    <form onSubmit={handleBlogPost}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
          />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
          />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
          />
      </div>
      <button type="submit">create</button>
    </form>  
  )

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
      <h2>Create New</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App