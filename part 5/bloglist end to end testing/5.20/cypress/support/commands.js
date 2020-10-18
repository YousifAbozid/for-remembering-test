// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

/*
there is a problem in this command below, this request can't just complete because the body is missing userId,
I can't get this useId at all, and the backend requires userId including in the request body as follows
===
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
})
=== 
this code above from my backend and as you can see it should be a userId in the request body, so now I can't add
UserId to the body, and I won't use this cammand at all and insted I'll add new blog from the front end and it will take a long time.
*/

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title, author, url }, 
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
})