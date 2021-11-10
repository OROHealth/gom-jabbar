/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('test mobx functionality', () => {
    cy.getTestById('add-user-data').click()
    cy.getTestById('add-friend').click()
    cy.getTestById('about-page-btn').click()
  })

})
