describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'will',
      name: 'hehehaha',
      password: '1234'
    }
    cy.request('POST','http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, by Will Chen 2022')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('will')
    cy.get('#password').type('2345')
    cy.get('#login-button').click()
    cy.get('.error').contains('wrong credentials')

    cy.get('html').should('not.contain','hehehaha is logged in')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('will')
    cy.get('#password').type('1234')
    cy.get('#login-button').click()
    cy.contains('hehehaha logged in')
  })

  describe.only('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'will', password: '1234' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').type('a new note for testing')

      cy.contains('save').click()
      cy.contains('a new note for testing')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})