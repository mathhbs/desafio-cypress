class HomePage {
  // Valida home admin
  assertHomeAdmin() {
    cy.get('[data-testid="home"]').should('be.visible');
  }

  // Links do menu
  linkCadastrarUsuarios() {
    return cy.get('[data-testid="cadastrar-usuarios"]');
  }

  linkListarUsuarios() {
    return cy.get('[data-testid="listar-usuarios"]');
  }

  linkCadastrarProdutos() {
    return cy.get('[data-testid="cadastrar-produtos"]');
  }

  linkListarProdutos() {
    return cy.get('[data-testid="listar-produtos"]');
  }

  linkRelatorios() {
    return cy.get('[data-testid="link-relatorios"]');
  }

  // Botões dos cards
  clicarBotaoCadastrarUsuarios() {
    cy.get('[data-testid="cadastrarUsuarios"]').click();
  }

  clicarBotaoListarUsuarios() {
    cy.get('[data-testid="listarUsuarios"]').click();
  }

  clicarBotaoCadastrarProdutos() {
    cy.get('[data-testid="cadastrarProdutos"]').click();
  }

  clicarBotaoListarProdutos() {
    cy.get('[data-testid="listarProdutos"]').click();
  }

  clicarBotaoRelatorios() {
    cy.get('[data-testid="relatorios"]').click();
  }
}

export default new HomePage();


