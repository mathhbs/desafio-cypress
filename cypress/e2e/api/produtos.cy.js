describe('API • Produtos', () => {
  let token;

  before(() => {
    cy.getAdminToken().then((tkn) => (token = tkn));
  });

  it('GET /produtos • deve listar produtos com campos obrigatórios', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}/produtos`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('produtos').that.is.an('array');
      if (res.body.produtos.length) {
        const p = res.body.produtos[0];
        expect(p).to.have.property('_id');
        expect(p).to.have.property('nome');
        expect(p).to.have.property('preco');
        expect(p).to.have.property('descricao');
        expect(p).to.have.property('quantidade');
      }
    });
  });

  it('POST /produtos • deve cadastrar produto (201) ou acusar duplicidade (400)', () => {
    const produto = {
      nome: `Produto QA ${Date.now()}`,
      preco: 100,
      descricao: 'Produto de teste via API',
      quantidade: 5,
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: { Authorization: token },
      body: produto,
      failOnStatusCode: false,
    }).then((res) => {
      expect([201, 400]).to.include(res.status);
      if (res.status === 201) {
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso');
      } else {
        expect(res.body.message).to.match(/já existe|cadastr/i);
      }
    });
  });

  it('DELETE /produtos/:id • deve excluir produto recém-criado', () => {
    const produto = {
      nome: `Produto Delete ${Date.now()}`,
      preco: 50,
      descricao: 'Produto temporário',
      quantidade: 1,
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: { Authorization: token },
      body: produto,
    }).then((resCreate) => {
      expect(resCreate.status).to.eq(201);
      const id = resCreate.body._id;

      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/produtos/${id}`,
        headers: { Authorization: token },
      }).then((resDelete) => {
        expect([200, 204]).to.include(resDelete.status);
      });
    });
  });
});