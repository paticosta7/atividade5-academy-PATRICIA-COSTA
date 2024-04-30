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
      "Não foi possível consultar os usuários cadastrados."
    );
  }

  mensagemErroUsuariosVazios() {
    cy.get("h3").should(
      "contain",
      "Ops! Não existe nenhum usuário para ser exibido."
    );
  }

  cadastrarNovoUsuário() {
    cy.get("p").should("contain", "Cadastre um novo usuário");
  }

  conferirNumeroDeUsuários(listLength) {
    // se listlength é = a quantidade de itens
    //userAmount é quantidade de paginas x os itens por pagina, no caso 6
    
    cy.get("#paginacaoAtual")
      .invoke("text")
      .then((text) => {
        const pagesAmount = Number(text.split("de ")[1]);
        cy.log(text);
        const usersAmount = 6 * pagesAmount;
        expect(listLength).to.equal(usersAmount);
      });
  }
}
