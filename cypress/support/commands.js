
Cypress.Commands.add('createAdminUser', () => {
  const admin = {
    nome: 'Admin QA',
    email: `admin.qa+${Date.now()}@test.com`,
    password: '123456',
    administrador: 'true'
  };

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: admin,
    failOnStatusCode: false // 400 se já existir
  }).then(() => admin);
});

/**
 * Cria admin + autentica. Retorna token de autorização.
 */
Cypress.Commands.add('getAdminToken', () => {
  return cy.createAdminUser().then((admin) => {
    return cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: admin.email,
      password: admin.password
    }).then((res) => res.body.authorization);
  });
});

/**
 * Cria um admin e disponibiliza como alias (this.admin) no spec.
 * Uso: before(() => cy.createAdminAlias())  // cria e salva como admin
 */
Cypress.Commands.add('createAdminAlias', (alias = 'admin') => {
  return cy.createAdminUser().then((admin) => {
    return cy.wrap(admin).as(alias);
    
  });
});

Cypress.Commands.add('loginAdminUI', () => {
  return cy.createAdminUser().then((admin) => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').clear().type(admin.email);
    cy.get('[data-testid="senha"]').clear().type(admin.password, { log: false });
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/admin/home');
    cy.get('[data-testid="logout"]').should('be.visible');
    
    return cy.wrap(admin).as('admin');
  
  });
});

// ================================
// UTILITÁRIOS DE API BÁSICOS
// ================================
Cypress.Commands.add('apiCreateUser', (user) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: user,
    failOnStatusCode: false // 400 quando email já existe
  });
});

Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { email, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('ensureUserExists', (fixtureName = 'usuario') => {
  cy.fixture(fixtureName).then((user) => {
    cy.apiCreateUser(user).then((res) => {
      expect([201, 400]).to.include(res.status);
    });
  });
});

// ================================
// LOGIN / LOGOUT PELA UI
// ================================
Cypress.Commands.add('loginUI', (fixtureName = 'usuario') => {
  cy.fixture(fixtureName).then((user) => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').clear().type(user.email);
    cy.get('[data-testid="senha"]').clear().type(user.password, { log: false });
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/admin/home');
    cy.get('[data-testid="logout"]').should('be.visible');
  });
});

Cypress.Commands.add('logoutUI', () => {
  cy.get('[data-testid="logout"]').click({ force: true });
});

// ================================
// NAVBAR / CARDS (HOME ADMIN)
// ================================
Cypress.Commands.add('navCadastrarUsuarios', () => {
  cy.get('[data-testid="link-cadastrar-usuario"]').click();
});

Cypress.Commands.add('navListarUsuarios', () => {
  cy.get('[data-testid="link-listar-usuario"]').click();
});

Cypress.Commands.add('navCadastrarProdutos', () => {
  cy.get('[data-testid="link-cadastrar-produto"]').click();
});

Cypress.Commands.add('navListarProdutos', () => {
  cy.get('[data-testid="link-listar-produto"]').click();
});

Cypress.Commands.add('navRelatorios', () => {
  cy.get('[data-testid="link-relatorios"]').click();
});

Cypress.Commands.add('cardCadastrarUsuarios', () => {
  cy.get('[data-testid="cadastrarUsuarios"]').click();
});

Cypress.Commands.add('cardListarUsuarios', () => {
  cy.get('[data-testid="listarUsuarios"]').click();
});

Cypress.Commands.add('cardCadastrarProdutos', () => {
  cy.get('[data-testid="cadastrarProdutos"]').click();
});

Cypress.Commands.add('cardListarProdutos', () => {
  cy.get('[data-testid="listarProdutos"]').click();
});

Cypress.Commands.add('cardRelatorios', () => {
  cy.get('[data-testid="relatorios"]').click();
});

// ================================
// QUALIDADE DE VIDA
// ================================
Cypress.Commands.add('waitUrl', (fragment, timeout = 10000) => {
  cy.url({ timeout }).should('include', fragment);
});
