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

Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
  cy.wait(500);
});

Cypress.Commands.add('showLoginForm', () => {
  cy.get('#registerForm')
    .find('button[data-auth=login]')
    .click({ force: true });
  cy.get('#loginForm').should('be.visible');
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('#loginForm').find('input[name=email]').type(email, { force: true });
  cy.get('#loginForm')
    .find('input[name=password]')
    .type(password, { force: true });
  cy.get('#loginForm').find('button[type=submit]').click({ force: true });
  cy.wait(1500);
});

Cypress.Commands.add('loginWithTestUser', () => {
  cy.login(Cypress.env('email'), Cypress.env('password'));
});

Cypress.Commands.add('fillLoginForm', (loginData) => {
  cy.get('input#loginEmail').type(loginData.email);
  cy.get('input#loginPassword').type(loginData.password);
});

Cypress.Commands.add('submitLoginForm', () => {
  cy.get('button[type="submit"]').contains('Login').click();
});

Cypress.Commands.add('interceptLoginRequest', () => {
  cy.intercept(
    'POST',
    'https://nf-api.onrender.com/api/v1/social/auth/login',
  ).as('loginRequest');
});

Cypress.Commands.add('validateLoginRequest', (expectedStatusCode) => {
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(expectedStatusCode);
  });
});

Cypress.Commands.add('validateLoginForm', () => {
  cy.get('form#loginForm').then(($form) => {
    if ($form[0].checkValidity()) {
      // Form is valid, no validation error
    } else {
      // Form is invalid, validation error has been triggered
      cy.get('input#loginEmail').then(($input) => {
        expect($input[0].validationMessage).not.to.be.null;
      });
    }
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('button[data-auth=logout]').click();
  cy.wait(500);
});

Cypress.Commands.add('isLoggedIn', () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem('token')).to.be.a('string');
  });
});

Cypress.Commands.add('isLoggedOut', () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem('token')).to.be.null;
  });
});

Cypress.Commands.add('viewFeed', () => {
  cy.visitHome();
  cy.showLoginForm();
  cy.loginWithTestUser();
  cy.visitHome();
  cy.wait(500);
});

Cypress.Commands.add('shouldShowListOfPosts', () => {
  cy.get('.post.list').should('be.visible');
});

Cypress.Commands.add('showSinglePost', () => {
  cy.get('.post.list').find('.post').first().find('[data-action=view]').click();
  cy.wait(500);
  cy.url().should('include', 'postId=');
});

Cypress.Commands.add('fillOutPostForm', () => {
  cy.fixture('post').then((post) => {
    cy.get('input[name=title]').type(post.initial.title, { delay: 100 });
    cy.get('input[name=tags]').type(post.initial.tags, { delay: 100 });
    cy.get('textarea[name=body]').type(post.initial.body, { delay: 100 });
  });
});

Cypress.Commands.add('fillOutUpdatedPostForm', () => {
  cy.fixture('post').then((post) => {
    cy.get('input[name=title]')
      .clear({ force: true })
      .type(post.updated.title, { delay: 100 });
    cy.get('input[name=tags]')
      .clear({ force: true })
      .type(post.updated.tags, { delay: 100 });
    cy.get('textarea#postBody')
      .clear({ force: true })
      .type(post.updated.body, { delay: 100 });
  });
});

Cypress.Commands.add('deletePost', () => {
  cy.get('#nav-default button[data-action=delete]').click();
  cy.wait(2000);
});
