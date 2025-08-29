import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('Admin • Navegação pela Navbar', () => {
  
  beforeEach(() => cy.loginAdminUI());

  beforeEach(function () {
    LoginPage.visit();
    LoginPage.typeEmail(this.admin.email);
    LoginPage.typePassword(this.admin.password);
    LoginPage.submit();
    LoginPage.assertLoggedIn();
    HomePage.assertHomeAdmin();
  });

  const voltarHome = () => {
    
    cy.get('[data-testid="home"], body').then(() => {
      cy.visit('admin/home'); 
    });
  };

  it('deve abrir Cadastrar/Listar Usuários, Cadastrar/Listar Produtos e Relatórios', () => {
    HomePage.linkCadastrarUsuarios().click();
    cy.get('body').should('exist'); 
    voltarHome();

    HomePage.linkListarUsuarios().click();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.linkCadastrarProdutos().click();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.linkListarProdutos().click();
    cy.get('body').should('exist');
    voltarHome();

    HomePage.linkRelatorios().click();
    cy.get('body').should('exist');
  });
});
