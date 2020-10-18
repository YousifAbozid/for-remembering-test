describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Yousif Abozid',
            username: 'yousifabozid',
            password: 'Yoyo'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('yousifabozid')
            cy.get('#password').type('Yoyo')
            cy.get('#login-button').click()
            cy.contains('Yousif Abozid logged-in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('yousifabozid')
            cy.get('#password').type('Yoy')
            cy.get('#login-button').click()
            cy.get('.failure')
                .should('contain', 'wrong username or password :(')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Yousif Abozid logged-in')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'yousifabozid', password: 'Yoyo' })
        })
    
        it('A blog can be created', function() {
            cy.get('#new-blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('Yousif Abozid')
            cy.get('#url').type('cypress.io')
            cy.get('#create-button').click()

            cy.contains('new blog')
        })
    })
})  