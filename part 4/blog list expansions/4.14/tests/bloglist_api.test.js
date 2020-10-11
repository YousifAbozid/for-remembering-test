const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
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
    const newBlog = {
      title: 'I Love Programming',
      author: 'Yousif Abozid',
      url: 'https://www.facebook.com/YousifAbozid',
      likes: 12
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const authorsNames = blogsAtEnd.map(blog => blog.author)
    expect(authorsNames).toContain("Yousif Abozid")
  })

  test('if the likes property is missing, it will get the value 0', async () => {
    const newBlog = {
      title: 'I\'m Full Stack Web Developer',
      author: 'Yousif',
      url: 'https://github.com/YousifAbozid'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).not.toContain(undefined)
  })

  test('if url or title is missing, it will respond with status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Yousif Dan',
      url: 'https://github.com/YousifAbozid',
      likes: 5
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    const authorsNames = blogsAtEnd.map(blog => blog.author)
    expect(authorsNames).not.toContain('Yousif Dan')
  })
})

afterAll(() => {
  mongoose.connection.close()
})