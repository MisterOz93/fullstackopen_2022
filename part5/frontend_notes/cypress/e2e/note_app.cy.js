//cont from failed login test
describe('Note app', function(){

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Root',
      username: 'Root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username-field').type('Root')
    cy.get('#password-field').type('password')
    cy.get('#login-submit').click()
    cy.contains('Logged in as Root')
  })

  describe('when logged in', function(){

    beforeEach(function(){
      cy.login({ username: 'Root', password: 'password' })
    })

    it('a new note can be created', function() {
      cy.contains('Add Note').click()
      cy.get('#note-content').type('Created via Cypress')
      cy.contains('Save').click()
      cy.contains('Created via Cypress')
    })

    describe('and several notes exist', function(){
      beforeEach(function(){
        cy.createNote({ content: 'first note' })
        cy.createNote({ content: 'second note' })
        cy.createNote({ content: 'third note' })
      })

      it('one of the notes can be made important', function(){
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton')
          .should('contain', 'make unimportant')
      })
    })

  })
  it('login fails with wrong password', function(){
    cy.contains('login').click()
    cy.get('#username-field').type('Root')
    cy.get('#password-field').type('wrongpassword')
    cy.get('#login-submit').click()
    cy.contains('Invalid Username or Password')
    cy.get('html').should('not.contain', 'Logged in as Root')
  })

})