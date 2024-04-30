// usersPage.js
export class UsersPage {
  visitar() {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  }

  inputDeBusca(inputValue) {
    cy.get('input[placeholder="E-mail ou nome"]').type(inputValue);
  }

  nomeDeUsuárioEncontrado(nomeUsuario) {
    cy.get('[data-test="userDataName"]')
      .invoke("text")
      .then((textoDoUsuario) => {
        expect(textoDoUsuario.trim()).to.include(nomeUsuario);
      });
  }

  emailDeUsuárioEncontrado(emailUsuario) {
    cy.get('[data-test="userDataEmail"]')
      .invoke("text")
      .then((textoDoUsuario) => {
        expect(textoDoUsuario.trim()).to.include(emailUsuario);
      });
  }
  nomeDeUsuárioNaoEncontrado() {
    cy.get('[data-test="userDataName"]').should("not.exist");
    cy.get("h3").should(
      "contain",
      "Ops! Não existe nenhum usuário para ser exibido."
    );
  }
  emailDeUsuárioNaoEncontrado() {
    cy.get('[data-test="userDataEmail"]').should("not.exist");
    cy.get("h3").should(
      "contain",
      "Ops! Não existe nenhum usuário para ser exibido."
    );
  }
}

//<h3>Ops! Não existe nenhum usuário para ser exibido.</h3>
