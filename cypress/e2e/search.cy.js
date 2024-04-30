import { UsersPage } from "../support/pages/search";

describe("Teste para pesquisar por usuário", () => {
  const usersPage = new UsersPage();
  let user;

  before(() => {
    cy.request({
      method: "POST",
      url: "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
      body: {
        name: "Pinguim QA",
        email: "pinguinn@qa.com",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(201);
      user = response.body;
      usersPage.visitar();
    });
  });
  before(() => {
    usersPage.deletarUsuario(user.id);
  });

  it("Deve ser possível localizar um usuário pelo nome", () => {
    const nomeUsuario = "Bruce Wayne";

    usersPage.inputDeBusca(nomeUsuario);
    usersPage.nomeDeUsuárioEncontrado(nomeUsuario);
  });

  it("Deve ser possível localizar um usuário pelo email", () => {
    const emailUsuario = "brucewayne@teste.com";

    usersPage.inputDeBusca(emailUsuario);
    usersPage.emailDeUsuárioEncontrado(emailUsuario);
  });

  it("Não deve encontrar usuário pelo e-mail", () => {
    const emailUsuario = "vezena.fortalezaaa@teste.com";

    usersPage.inputDeBusca(emailUsuario);
    usersPage.emailDeUsuárioNaoEncontrado();
  });

  it("Não deve ser possível localizar um usuário pelo nome", () => {
    const nomeUsuario = "Juscelino Star Wars Verde";

    usersPage.inputDeBusca(nomeUsuario);
    usersPage.nomeDeUsuárioNaoEncontrado();
  });
});
