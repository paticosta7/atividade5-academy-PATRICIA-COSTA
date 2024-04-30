import PaginaRegistroUsuario from "../support/pages/userRegistration"; //importando pagesobject userRegistr

const paginaRegistroUsuario = new PaginaRegistroUsuario();

describe("Teste de Registro de Novo Usuário", () => {
  beforeEach(() => {
    paginaRegistroUsuario.visitar();
  });
  it("Deve efetuar o registro com sucesso", () => {
    paginaRegistroUsuario.preencherNome("Bruce Wayne");
    paginaRegistroUsuario.preencherEmail("brucewayne@teste.com");
    paginaRegistroUsuario.clicarBotaoEnviar();
  });

  after(() => {
    cy.limparCadastroUsuario();
  });
  it("Não deve ser possível registrar um usuário sem informar um nome", () => {
    paginaRegistroUsuario.preencherEmail("brucewayne@teste.com");
    paginaRegistroUsuario.clicarBotaoEnviar();
    paginaRegistroUsuario
      .pegarMensagemErro()
      .should("be.visible")
      .and("contain", "O campo nome é obrigatório");
  });

  it("Não deve ser possível registrar um usuário sem informar um email", () => {
    paginaRegistroUsuario.preencherNome("Bruce Wayne");
    paginaRegistroUsuario.clicarBotaoEnviar();
    paginaRegistroUsuario.pegarMensagemErro().should("be.visible");
  });

  it("Não deve ser possível registrar um usuário sem informar um email válido", () => {
    paginaRegistroUsuario.preencherNome("Bruce W");
    paginaRegistroUsuario.preencherEmail("brucew.com");
    paginaRegistroUsuario.clicarBotaoEnviar();
    paginaRegistroUsuario.pegarMensagemErro().should("be.visible");
  });

  describe("Teste de Registro de Novo Usuário com Dados em Uso", () => {
    it("Deve ocorrer um erro quando o e-mail já estiver em uso", () => {
      paginaRegistroUsuario.preencherNome("Batman");
      paginaRegistroUsuario.preencherEmail("brucewayne@teste.com");
      paginaRegistroUsuario.clicarBotaoEnviar();
      cy.verificarMensagemAlerta("User already exists.");
    });

    it("Deve ocorrer um erro quando o nome já estiver em uso", () => {
      paginaRegistroUsuario.preencherNome("Bruce Wane");
      paginaRegistroUsuario.preencherEmail("batman@teste.com");
      paginaRegistroUsuario.clicarBotaoEnviar();
      cy.verificarMensagemAlerta("User already exists.");
    });
  });

  describe("Não deve ser possível registrar deixando os campos obrigatórios em branco", () => {
    it("Não deve ser possível registrar um usuário sem informar um nome e e-mail", () => {
      paginaRegistroUsuario.clicarBotaoEnviar();
      paginaRegistroUsuario
        .pegarMensagemErro()
        .should("be.visible")
        .and("contain", "O campo nome é obrigatório.");
      paginaRegistroUsuario
        .pegarMensagemErro()
        .should("be.visible")
        .and("contain", "O campo e-mail é obrigatório.");
    });

    describe("Não deve ser possível registrar com nome inválido", () => {
      it("Não é possível registrar usando número no campo nome ", () => {
        paginaRegistroUsuario.preencherNome("Bruce13");
        paginaRegistroUsuario.preencherEmail("brucewayne@fest.com");
        paginaRegistroUsuario.clicarBotaoEnviar();
      });
    });
  });

  describe("Não deve ser possível registrar com um nome com mais de 100 caracteres", () => {
    it("Não é possível registrar com um nome com mais de 100 caracteres ", () => {
      paginaRegistroUsuario.preencherNome("BruceWayne".repeat(20)); // Repete "BruceWayne" 20 vezes
      paginaRegistroUsuario.preencherEmail("bruce-wayne@qa.com");
      paginaRegistroUsuario.clicarBotaoEnviar();
      paginaRegistroUsuario.pegarMensagemErro().should("be.visible");
    });
  });

  describe("Não deve ser possível registrar com um email com mais de 60 caracteres", () => {
    it("Não é possível registrar com um email com mais de 60 caracteres ", () => {
      paginaRegistroUsuario.preencherNome("Robin Batman");
      paginaRegistroUsuario.preencherEmail(
        "brucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebrucebruce@qa.com"
      );
      paginaRegistroUsuario.clicarBotaoEnviar();
      paginaRegistroUsuario.pegarMensagemErro().should("be.visible");
    });
  });

  describe("Não deve ser possível registrar com um nome com menos de 4 caracteres", () => {
    it("Não é possível registrar com um nome com menos de 4 caracteres ", () => {
      paginaRegistroUsuario.preencherNome("Bat");
      paginaRegistroUsuario.preencherEmail("bat-man@qa.com");
      paginaRegistroUsuario.clicarBotaoEnviar();
      paginaRegistroUsuario.pegarMensagemErro().should("be.visible");
    });
  });
});
