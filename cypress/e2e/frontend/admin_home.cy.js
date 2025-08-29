import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('Admin • Home (render)', () => {
  
  beforeEach(() => cy.loginAdminUI()
);

  it('deve exibir home admin, navbar e botões dos cards', function () {
    LoginPage.visit();
    LoginPage.typeEmail(this.admin.email);
    LoginPage.typePassword(this.admin.password);
    LoginPage.submit();
    LoginPage.assertLoggedIn();

    // Home admin presente
    HomePage.assertHomeAdmin();

    // Links do topo
    HomePage.linkCadastrarUsuarios().should('be.visible');
    HomePage.linkListarUsuarios().should('be.visible');
    HomePage.linkCadastrarProdutos().should('be.visible');
    HomePage.linkListarProdutos().should('be.visible');
    HomePage.linkRelatorios().should('be.visible');

    // Botões dos cards
    cy.get('[data-testid="cadastrarUsuarios"]').should('be.visible');
    cy.get('[data-testid="listarUsuarios"]').should('be.visible');
    cy.get('[data-testid="cadastrarProdutos"]').should('be.visible');
    cy.get('[data-testid="listarProdutos"]').should('be.visible');
    cy.get('[data-testid="relatorios"]').should('be.visible');
  });
});
