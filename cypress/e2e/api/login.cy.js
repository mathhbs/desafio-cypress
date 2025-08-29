describe('API • Login', () => {
  it('POST /login • autentica com sucesso e retorna token', () => {
    const user = {
      nome: 'Login QA',
      email: `login.qa+${Date.now()}@test.com`,
      password: '123456',
      administrador: 'true',
    };

    cy.apiCreateUser(user);

    cy.apiLogin(user.email, user.password).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.authorization).to.be.a('string');
    });
  });

  it('POST /login • falha com senha inválida (401) e mensagem exata', () => {
    const user = {
      nome: 'LoginFail QA',
      email: `loginfail.qa+${Date.now()}@test.com`,
      password: '123456',
      administrador: 'false',
    };

    cy.apiCreateUser(user);

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      failOnStatusCode: false,
      body: { email: user.email, password: 'senhaerrada' },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Email e/ou senha inválidos');
    });
  });
});