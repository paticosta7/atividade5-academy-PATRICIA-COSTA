import { UsersPage } from "../support/pages/search";

describe("Teste para pesquisar por usuário", () => {
  const usersPage = new UsersPage();

  beforeEach(() => {
    usersPage.visitar();
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
