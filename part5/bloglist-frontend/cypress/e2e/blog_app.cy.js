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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('Add a Blog').click()
      cy.get('#title').type('Blog created through Cypress')
      cy.get('#author').type('Cy Press')
      cy.get('#url').type('cy.press')
      cy.get('#create_blog_button').click()
      cy.contains('Add a Blog')
      cy.get('.blog').should('have.css', 'border', '1px solid rgb(0, 0, 0)')
        .should('contain', 'Blog created through Cypress by Cy Press')
    })

    it.only('A blog can be liked by the user', function(){
      cy.createBlog({ title: 'blog a', author: 'Tester', url: '1234' })
      cy.createBlog({ title: 'blog b', author: 'Tester', url: '1234' })
      cy.createBlog({ title: 'blog c', author: 'Tester', url: '1234' })
      cy.get('.blog').contains('blog b').contains('View').click()
        .get('#like_button').click()
      cy.get('.blog').contains('blog b').parent().contains('Likes: 1')
    })

  })


})