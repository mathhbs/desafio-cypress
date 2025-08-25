Cypress.Commands.add('loginUI', (email, senha) => {
  cy.visit('/') // baseUrl
  cy.get('input[name="email"], input#email').type(email)
  cy.get('input[name="password"], input#password').type(senha, { log: false })
  cy.contains('button, [type="submit"]', 'Entrar', { matchCase: false }).click()
})
