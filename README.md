# 📌 Desafio de Automação com Cypress – ServeRest

[![cypress](https://github.com/mathhbs/desafio-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/mathhbs/desafio-cypress/actions/workflows/cypress.yml)

Automação de testes **E2E (Frontend)** e **API** utilizando **Cypress** para o desafio da **ServeRest**.
O projeto cobre cenários de **Login**, **Navegação no painel Admin**, **Carrinho de compras**, além de testes de **API** para usuários e produtos.

---

## 🚀 Tecnologias Utilizadas

* [Node.js 20+](https://nodejs.org/)
* [Cypress 13.14.2](https://docs.cypress.io/)
* [Mochawesome](https://www.npmjs.com/package/mochawesome) (relatórios HTML)
* [GitHub Actions](https://docs.github.com/actions) (CI/CD)

---

## ⚙️ Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/mathhbs/desafio-cypress.git
cd desafio-cypress
```

2. Instale as dependências:

```bash
npm install
```

3. Execute os testes:

* **Modo interativo**

```bash
npm run open
```

* **Modo headless (CI)**

```bash
npm test
```

4. Gerar relatórios (Mochawesome):

```bash
npm run report
```

O relatório HTML será gerado em:

```
cypress/reports/html/index.html
```

---

## 📂 Estrutura do Projeto

```
cypress/
  e2e/
    frontend/
      admin_home.cy.js      # Validação da tela inicial do Admin
      admin_navbar.cy.js    # Navegação pelos links da Navbar
      admin_cards.cy.js     # Navegação pelos atalhos dos Cards
    api/
      usuarios.cy.js        # Testes de criação, listagem e exclusão de usuários
      login.cy.js           # Testes de autenticação
      produtos.cy.js        # Testes de listagem e CRUD de produtos
  fixtures/
    usuario.json            # Massa de dados de usuário base
  support/
    commands.js             # Comandos customizados (login, API helpers, navegação)
    e2e.js                  # Arquivo de suporte global
    pages/
      LoginPage.js          # Page Object da tela de Login
      HomePage.js           # Page Object da Home do Admin
cypress.config.js           # Configuração do Cypress
package.json                # Configuração do projeto
.gitignore                  # Ignora node_modules, vídeos e relatórios
README.md                   # Documentação do desafio
```

---

## 🧪 Cenários Implementados

### **Frontend (E2E)**

1. **Home Admin**

   * Valida título *“Bem Vindo”*, navbar, cards e botão **Logout**.
     Arquivo: `cypress/e2e/frontend/admin_home.cy.js`

2. **Navegação pela Navbar**

   * Acessa: *Cadastrar Usuários*, *Listar Usuários*, *Cadastrar Produtos*, *Listar Produtos* e *Relatórios*.
     Arquivo: `cypress/e2e/frontend/admin_navbar.cy.js`

3. **Atalhos pelos Cards**

   * Utiliza os botões dos cards da Home para navegar às telas correspondentes.
     Arquivo: `cypress/e2e/frontend/admin_cards.cy.js`

### **API**

1. **Usuários (`usuarios.cy.js`)**

   * `POST /usuarios` → cadastra usuário admin (ou detecta duplicado).
   * `GET /usuarios` → lista usuários e valida campos obrigatórios.
   * `DELETE /usuarios/:id` → cria e remove um usuário.

2. **Login (`login.cy.js`)**

   * `POST /login` sucesso → retorna **authorization token**.
   * `POST /login` falha (senha incorreta) → retorna **401** e mensagem **“Email e/ou senha inválidos”**.

3. **Produtos (`produtos.cy.js`)**

   * `GET /produtos` → lista produtos e valida campos obrigatórios.
   * `POST /produtos` → cadastra produto (201) ou retorna duplicidade (400).
   * `DELETE /produtos/:id` → cria e exclui produto autenticado.

---

## 🤖 Integração Contínua (GitHub Actions)

Arquivo: **`.github/workflows/cypress.yml`**

* Roda os testes Cypress a cada `push` ou `pull_request`.
* Gera relatório Mochawesome em `cypress/reports/html/index.html`.
* Faz upload automático de **vídeos** e **screenshots** como artefatos em caso de falha.

---

## 💡 Boas Práticas Aplicadas

* **Page Objects** para centralizar seletores.
* **Custom Commands** para login e chamadas de API.
* **Fixtures** para massa de dados.
* **Uso de `data-testid`** como seletor principal (estabilidade).
* **Retries** configurados em `runMode` para evitar flakiness no CI.
* **Commits semânticos** (`feat`, `test`, `chore`, `docs`).
* Relatórios legíveis via **Mochawesome**.

---

## 📸 Evidências

* Prints da execução dos testes no modo interativo.
* Relatórios HTML e vídeos estão disponíveis nos artefatos do GitHub Actions.

---

## 📄 Licença

Projeto desenvolvido para fins de avaliação técnica.

```

