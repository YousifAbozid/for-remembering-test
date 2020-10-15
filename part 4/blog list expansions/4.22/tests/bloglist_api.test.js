const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('post tests', () => {
  test('a valid blog can be added ', async () => {
    // get userID of root user
    const allUsers = await api.get('/api/users')
    const root_user_ID = (allUsers.body[0].id)
    // console.log(root_user_ID)
 
    // get token for root user
    const postTokenRequest = await api.post('/api/login')
    .send({
      username: "root",
      password: "sekret"
    })
    const rootUserToken = postTokenRequest.body.token
    // console.log(rootUserToken)

    const newBlog = {
      title: 'I Love Programming',
      author: 'Yousif Abozid',
      url: 'https://www.facebook.com/YousifAbozid',
      likes: 12,
      userId: root_user_ID
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${rootUserToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const authorsNames = blogsAtEnd.map(blog => blog.author)
    expect(authorsNames).toContain("Yousif Abozid")
  })

  test('if the likes property is missing, it will get the value 0', async () => {
    // get userID of root user
    const allUsers = await api.get('/api/users')
    const root_user_ID = (allUsers.body[0].id)
    // console.log(root_user_ID)
 
    // get token for root user
    const postTokenRequest = await api.post('/api/login')
    .send({
      username: "root",
      password: "sekret"
    })
    const rootUserToken = postTokenRequest.body.token
    // console.log(rootUserToken)

    const newBlog = {
      title: 'I\'m Full Stack Web Developer',
      author: 'Yousif',
      url: 'https://github.com/YousifAbozid',
      userId: root_user_ID
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${rootUserToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).not.toContain(undefined)
  })

  test('if url or title is missing, it will respond with status code 400 Bad Request', async () => {
    // get userID of root user
    const allUsers = await api.get('/api/users')
    const root_user_ID = (allUsers.body[0].id)
    // console.log(root_user_ID)
 
    // get token for root user
    const postTokenRequest = await api.post('/api/login')
    .send({
      username: "root",
      password: "sekret"
    })
    const rootUserToken = postTokenRequest.body.token
    // console.log(rootUserToken)

    const newBlog = {
      author: 'Yousif Dan',
      url: 'https://github.com/YousifAbozid',
      likes: 5,
      userId: root_user_ID
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${rootUserToken}`)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    const authorsNames = blogsAtEnd.map(blog => blog.author)
    expect(authorsNames).not.toContain('Yousif Dan')
  })

  test('Missing token returns 401 Unauthorized', async () => {
    // get userID of root user
    const allUsers = await api.get('/api/users')
    const root_user_ID = (allUsers.body[0].id)
    // console.log(root_user_ID)

    const newBlog = {
      title: 'I Love Programming',
      author: 'Yousif Abozid',
      url: 'https://www.facebook.com/YousifAbozid',
      likes: 12,
      userId: root_user_ID
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})