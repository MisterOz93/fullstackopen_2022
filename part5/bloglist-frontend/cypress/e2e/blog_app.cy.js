describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Tester',
      name: 'Tester',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003:/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log In to Bloglist Application')
    cy.contains('Username:')
    cy.contains('Password:')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('password')
      cy.get('#log_in_button').click()
      cy.contains('Logged in as Tester')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('wrong password')
      cy.get('#log_in_button').click()
      cy.get('#error_message').should('have.css', 'color',
        'rgb(255, 0, 0)').should('contain', 'Invalid Username or Password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('password')
      cy.get('#log_in_button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get('#title').type('Blog created through Cypress')
      cy.get('#author').type('Cy Press')
      cy.get('#url').type('cy.press')
      cy.get('#create_blog_button').click()
      cy.contains('Create Blog')
      cy.get('.blog').should('have.css', 'border', '1px solid rgb(0, 0, 0)')
        .should('contain', 'Blog created through Cypress by Cy Press')
    })
  })

})