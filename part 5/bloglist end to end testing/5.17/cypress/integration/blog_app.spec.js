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
})  