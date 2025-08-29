describe('API • Usuários', () => {
  let token;

  before(() => {
    cy.getAdminToken().then((t) => (token = t));
  });

  it('POST /usuarios • cria usuário (201) ou detecta duplicado (400)', () => {
    const user = {
      nome: 'Matheus QA',
      email: `matheus.qa+${Date.now()}@test.com`,
      password: '123456',
      administrador: 'true',
    };

    cy.apiCreateUser(user).then((res) => {
      expect([201, 400]).to.include(res.status);
      if (res.status === 201) {
        expect(res.body).to.have.property('_id');
        expect(res.body.message).to.match(/sucesso/i);
      } else {
        expect(res.body.message).to.match(/já está cadastrado/i);
      }
    });
  });

  it('GET /usuarios • lista usuários', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}/usuarios`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('usuarios').that.is.an('array');
    });
  });

  it('DELETE /usuarios/:id • exclui um usuário recém-criado (requer token)', () => {
    const user = {
      nome: 'User Delete',
      email: `delete.qa+${Date.now()}@test.com`,
      password: '123456',
      administrador: 'false',
    };

    cy.apiCreateUser(user).then((resCreate) => {
      expect([201, 400]).to.include(resCreate.status);
      if (resCreate.status === 201) {
        const id = resCreate.body._id;
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
          headers: { Authorization: token },
          failOnStatusCode: false,
        }).then((resDelete) => {
          expect([200, 204]).to.include(resDelete.status);
        });
      }
    });
  });
});