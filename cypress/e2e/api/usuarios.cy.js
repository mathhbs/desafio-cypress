describe('API - Usuários', () => {
  it('POST /usuarios - deve cadastrar usuário com sucesso', () => {
    cy.fixture('usuario').then((user) => {
      cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, user)
        .then((res) => {
          expect(res.status).to.eq(201)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.match(/sucesso/i)
          expect(res.body).to.have.property('_id')
        })
    })
  })

  it('POST /login - deve autenticar e retornar token', () => {
    cy.fixture('usuario').then((user) => {
      // garante que o usuário existe
      cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, user)
      // autentica
      cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
        email: user.email,
        password: user.password
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('authorization').and.to.be.a('string')
      })
    })
  })
})
