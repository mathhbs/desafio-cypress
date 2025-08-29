import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('Admin • Atalhos via Cards', () => {
  
  beforeEach(() => cy.loginAdminUI());

  beforeEach(function () {
    LoginPage.visit();
    LoginPage.typeEmail(this.admin.email);
    LoginPage.typePassword(this.admin.password);
    LoginPage.submit();
    LoginPage.assertLoggedIn();
    HomePage.assertHomeAdmin();
  });

  const voltarHome = () => cy.visit('admin/home'); 
  
  it('deve abrir telas via botões dos cards', () => {
    HomePage.clicarBotaoCadastrarUsuarios();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.clicarBotaoListarUsuarios();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.clicarBotaoCadastrarProdutos();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.clicarBotaoListarProdutos();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.clicarBotaoRelatorios();
    cy.get('body').should('exist');
  });
});
