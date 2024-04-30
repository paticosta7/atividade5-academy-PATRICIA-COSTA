// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("limparCadastroUsuario", () => {
  cy.request("GET", "/users").then((response) => {
    cy.log("Resposta da requisição GET /users:", response);

    if (response.body && Array.isArray(response.body)) {
      cy.log("Usuários encontrados:", response.body.length);

      response.body.forEach((usuario) => {
        cy.log("Deletando usuário:", usuario.id);
        cy.request("DELETE", `/users/${usuario.id}`);
      });
    } else {
      cy.log("Resposta inválida ou nenhum usuário encontrado.");
    }
  });
});

Cypress.Commands.add("cadastrarUsuario", () => {
  let user;
  cy.request(
    "POST",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
    {
      name: "Bruce Wayne O batman",
      email: "brucewayneo@batman4gmail.com",
    }
  ).then((response) => {
    expect(response.status).to.eq(201);
    user = response.body;
    return user;
  });
});

Cypress.Commands.add("deletarUsuario", (id) => {
  cy.request(
    "DELETE",
    `https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users/${id}`
  ).then((response) => {
    expect(response.status).to.eq(204);
    return response.body;
  });
});

Cypress.Commands.add("verificarMensagemAlerta", (mensagem) => {
  cy.on("window:alert", (message) => {
    expect(message).to.equal(mensagem);
  });
});
