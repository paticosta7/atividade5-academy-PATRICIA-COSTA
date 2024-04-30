export class UsersListPage {
  visitar() {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  }

  listaEncontrada() {
    cy.get("#listaUsuarios").should("exist");
  }

  listaNaoEncontrada() {
    cy.get("#listaUsuarios").should("not.exist");
  }

  alertaErroServidor() {
    cy.get("p").should(
      "contain",
      "Não foi possível consultar os usuários cadastrados.",
    );
  }

  mensagemErroUsuariosVazios() {
    cy.get("h3").should(
      "contain",
      "Ops! Não existe nenhum usuário para ser exibido.",
    );
  }

  cadastrarNovoUsuário() {
    cy.get("p").should("contain", "Cadastre um novo usuário");
  }

  navegaEntrePaginas() {
    // Estado inicial
    cy.get("#paginacaoVoltar").should("be.disabled");
    cy.get("#paginacaoProximo").should("not.be.disabled");
    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((paginacao) => {
        const dadosPaginacao = this.dadosPaginacaoAtual(paginacao);

        expect(dadosPaginacao.paginaAtual).to.equal(1);
      });

    // Ir para próxima página
    cy.get("#paginacaoProximo").click();
    cy.get("#paginacaoVoltar").should("not.be.disabled");
    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((paginacao) => {
        const dadosPaginacao = this.dadosPaginacaoAtual(paginacao);

        expect(dadosPaginacao.paginaAtual).to.equal(2);
      });

    // Voltar para página anterior
    cy.get("#paginacaoVoltar").click();
    cy.get("#paginacaoVoltar").should("be.disabled");
    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((paginacao) => {
        const dadosPaginacao = this.dadosPaginacaoAtual(paginacao);

        expect(dadosPaginacao.paginaAtual).to.equal(1);
      });
  }

  listaPaginadaCorretamente(listLength) {
    const porPagina = 6;

    cy.wait(1000);
    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((paginacao) => {
        const dadosPaginacao = this.dadosPaginacaoAtual(paginacao);

        const totalPaginaDevePossuir = Math.ceil(listLength / porPagina);
        expect(dadosPaginacao.totalPaginas).to.equal(totalPaginaDevePossuir);
      });
  }

  listaNaoPaginada() {
    const porPagina = 6;

    cy.get("#paginacaoVoltar").should("be.disabled");
    cy.get("#paginacaoProximo").should("be.disabled");

    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((paginacao) => {
        const dadosPaginacao = this.dadosPaginacaoAtual(paginacao);

        expect(dadosPaginacao.paginaAtual).to.equal(1);
        expect(dadosPaginacao.totalPaginas).to.equal(1);
      });
  }

  dadosPaginacaoAtual(paginacao) {
    let totalPaginas = 1;
    let paginaAtual = 1;

    paginaAtual = Number(paginacao.split(" de ")[0]);
    totalPaginas = Number(paginacao.split(" de ")[1]);

    return { paginaAtual, totalPaginas };
  }
}
