class LoginPage {
  visit() {
    cy.visit('login');
  }

  typeEmail(email) {
    cy.get('[data-testid="email"]').type(email);
  }

  typePassword(senha) {
    cy.get('[data-testid="senha"]')
      .type(senha, { log: false });
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  assertLoggedIn() {
    cy.url().should('include', 'admin/home');
    cy.contains('button', /^logout$/i).should('be.visible');
  }
}
export default new LoginPage();
