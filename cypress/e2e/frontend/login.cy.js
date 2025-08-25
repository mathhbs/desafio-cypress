describe('Login - Frontend', () => {
  it('Deve logar com sucesso usando usuário criado via API', () => {
    cy.fixture('usuario').then((user) => {
      // 1) Cadastra usuário na API
      cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, user).its('status').should('eq', 201)

      // 2) Faz login pela UI
      cy.loginUI(user.email, user.password)

      // 3) Valida redirecionamento e elemento de tela
      cy.url().should('include', '/home')
      cy.contains(/bem\s*vind[oa]/i).should('be.visible') // tolerante a variações
    })
  })
})
