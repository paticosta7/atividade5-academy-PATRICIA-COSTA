import { UsersPage } from "../support/pages/search";

describe("Teste para pesquisar por usuário", () => {
  const usersPage = new UsersPage();
  let user;

  before(() => {
    cy.cadastrarUsuario().then((userData) => {
      user = userData;
      usersPage.visitar();
    });
  });

  after(() => {
    cy.deletarUsuario(user?.id);
  });

  it("Deve ser possível localizar um usuário pelo nome", () => {
    const nomeUsuario = user.name;

    usersPage.inputDeBusca(nomeUsuario);
    usersPage.nomeDeUsuárioEncontrado(nomeUsuario);
  });

  it("Deve ser possível localizar um usuário pelo email", () => {
    const emailUsuario = user.email;
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
