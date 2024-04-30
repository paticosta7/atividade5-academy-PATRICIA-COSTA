import { UsersListPage } from "../support/pages/list";
describe("Teste de Listagem de Usuários", () => {
  const usersListPage = new UsersListPage();
  beforeEach(() => {
    usersListPage.visitar();
  });

  it.only("Deve listar os usuários com sucesso", () => {
    cy.request(
      "GET",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users"
    ).then((response) => {
      expect(response.status).to.equal(200);
      const listLength = response.body.length;
      usersListPage.listaEncontrada();
      usersListPage.conferirNumeroDeUsuários(listLength);
    });
  });

  it("Deve retornar erro 500 ao tentar listar usuários", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("getUsers");

    usersListPage.listaNaoEncontrada();
    usersListPage.alertaErroServidor();
  });

  it("Deve existir uma opção para cadastrar um usuário.", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      body: [],
    }).as("getUsers");

    usersListPage.listaNaoEncontrada();
    usersListPage.mensagemErroUsuariosVazios();
    usersListPage.cadastrarNovoUsuário();
  });
});

// <div id="listaUsuarios" class="sc-fHjqPf dLIfot"><div id
// <li id="paginacaoAtual">44 de 83</li>
