import {anecdotes } from '../../data'

beforeEach(function(){
  cy.visit('http://localhost:3000')
})
describe('Anecdote App', function(){
  it('Can be opened', function(){
    cy.contains('Anecdotes')
  })
  it('Initializes Anecdotes from DB', function(){
    cy.contains(`${anecdotes[0].content}`)
  })
  it('registers vote clicks', function(){
    cy.get('#vote_button').click()
    cy.contains('You voted for ')
  })
})