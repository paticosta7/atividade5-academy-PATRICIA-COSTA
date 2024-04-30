import { UsersListPage } from "../support/pages/list";
describe("Teste de Listagem de Usuários", () => {
  const usersListPage = new UsersListPage();
  beforeEach(() => {
    usersListPage.visitar();
  });

  it("Deve listar os usuários com sucesso", () => {
    usersListPage.listaEncontrada();
  });

  it("Deve exibir total de paginas corretamente", () => {
    cy.request(
      "GET",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
    ).then((response) => {
      expect(response.status).to.equal(200);
      const listLength = response.body.length;

      usersListPage.listaEncontrada();
      usersListPage.listaPaginadaCorretamente(listLength);
    });
  });

  it("Deve navegar entre as paginas corretamente", () => {
    cy.fixture("users.json").then((users) => {
      cy.intercept("GET", "/api/v1/users", {
        statusCode: 200,
        body: users["listaComDuasPaginas"],
      }).as("getUsers");

      cy.wait("@getUsers").then(() => {
        usersListPage.navegaEntrePaginas();
      });
    });
  });

  it("Não deve exibir paginação caso possua menos de 6 usuários", () => {
    cy.fixture("users.json").then((users) => {
      cy.intercept("GET", "/api/v1/users", {
        statusCode: 200,
        body: users["listaComApenasUmaPagina"],
      }).as("getUsers");

      cy.wait("@getUsers").then(() => {
        usersListPage.listaNaoPaginada();
      });
    });
  });

  it("Deve retornar erro 500 ao tentar listar usuários", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 500,
    }).as("getUsers");

    cy.wait("@getUsers").then(() => {
      usersListPage.listaNaoEncontrada();
      usersListPage.alertaErroServidor();
    });
  });

  it("Deve existir uma opção para cadastrar um usuário quando não houver usuários.", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      body: [],
    }).as("getUsers");

    cy.wait("@getUsers").then(() => {
      usersListPage.listaNaoEncontrada();
      usersListPage.mensagemErroUsuariosVazios();
      usersListPage.cadastrarNovoUsuário();
    });
  });
});
