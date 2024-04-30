// userRegistrationPage.js

class PaginaRegistroUsuario {
  visitar() {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo");
  }

  preencherNome(nome) {
    cy.get("#name").clear().type(nome);
  }

  preencherEmail(email) {
    cy.get("#email").clear().type(email);
  }

  clicarBotaoEnviar() {
    cy.get(".sc-kpDqfm").click();
  }

  pegarMensagemErro() {
    return cy.get(".sc-cPiKLX");
  }

  pegarMensagemAlerta() {
    return cy.on("window:alert", (message) => {
      return message;
    });
  }
}

export default PaginaRegistroUsuario;
