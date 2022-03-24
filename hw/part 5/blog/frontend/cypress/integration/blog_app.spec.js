describe('Blog app', function() {
  beforeEach(function() {
    //clear the testig db first
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      username: 'sample-user',
      name: 'sample-name',
      password: '111'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  //check that the login form is displayed by default
  it('Login form is shown', function() {
    cy.contains('log in to the application')
  })

  describe('To log in', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sample-user')
      cy.get('#password').type('111')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sample-user')
      cy.get('#password').type('324')
      cy.get('#login-button').click()
      cy.get('#error')
        .should('contain','wrong username or password')
        .and('have.css','border-color','rgb(255, 0, 0)')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.request('POST','http://localhost:3003/api/login', {
        username: 'sample-user', password: '111'
      }).then(({ body }) => {
        localStorage.setItem('loggedUser',JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function() {
      cy.get('#title').type('sample-blog')
      cy.get('#author').type('sample-author')
      cy.get('#url').type('sample-url')
      cy.get('#create-blog-button').click()
      cy.get('.each-blog')
        .should('contain','sample-blog')
        .and('contain','sample-author')
    })
    //need a logged-in user for token verification
    describe('With at least one blog', function(){
      beforeEach(function() {
        cy.createBlog({
          author: 'author1',
          title: 'title1',
          url: 'url1'
        })
      })

      it('can like a post', function () {
        cy.get('.view-button').click()
        cy.get('.blog-likes').as('likes')
        cy.get('.like-button').click()
        cy.get('@likes').should('contain','1')
      })

      it('the owner of the blog can delete it', function () {
        cy.get('.view-button').click()
        cy.get('.remove-button').click()
        cy.get('html').should('not.contain', 'sample-title')
      })

      describe.only('with multiple blogs', function () {
        beforeEach(function() {
          cy.createBlog({ author:'author2', title:'title2', url:'url2' })
          cy.createBlog({ author:'author3', title:'title3', url:'url3' })
          cy.createBlog({ author:'author4', title:'title4', url:'url4' })

          cy.contains('author1').parent().as('blog1')
          cy.contains('author2').parent().as('blog2')
          cy.contains('author3').parent().as('blog3')
          cy.contains('author4').parent().as('blog4')
        })

        it('blogs are ordered by the amount of likes', function () {
          cy.get('@blog1').contains('view').click()
          cy.get('@blog2').contains('view').click()
          cy.get('@blog3').contains('view').click()
          cy.get('@blog4').contains('view').click()

          cy.get('@blog2').contains('like').as('likes2')
          cy.get('@blog3').contains('like').as('likes3')
          cy.get('@blog4').contains('like').as('likes4')

          cy.get('@likes2').click()
          cy.wait(500)
          cy.get('@likes2').click()
          cy.wait(500)
          cy.get('@likes3').click()
          cy.wait(500)
          cy.get('@likes3').click()
          cy.wait(500)
          cy.get('@likes3').click()
          cy.wait(500)
          cy.get('@likes4').click()
          cy.wait(500)

          cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).contains('0')
            cy.wrap(blogs[1]).contains('1')
            cy.wrap(blogs[2]).contains('2')
            cy.wrap(blogs[3]).contains('3')
          })
        })
      })
    })
  })
})