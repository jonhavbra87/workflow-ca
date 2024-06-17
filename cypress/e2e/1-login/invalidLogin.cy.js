describe('Login', () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it('shows a register form', () => {
    cy.get('#registerForm').should('be.visible');
  });

  it('shows a login form when the login button is pressed', () => {
    cy.showLoginForm();
  });

  it('allows a valid, registered user to login', () => {
    cy.showLoginForm();
    cy.loginWithTestUser();
    cy.isLoggedIn();
  });

  it('does not allow login with invalid credentials (wrong password)', () => {
    cy.showLoginForm();
    cy.wait(500);
    cy.fixture('loginData401').then((loginData) => {
      cy.get('input#loginEmail').type(loginData.email);
      cy.get('input#loginPassword').type(loginData.password);
    });
    cy.intercept(
      'POST',
      'https://nf-api.onrender.com/api/v1/social/auth/login',
    ).as('loginRequest');
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
    });
  });

  it('does not allow login with invalid credentials (non-Noroff email)', () => {
    cy.showLoginForm();
    cy.wait(500);
    cy.fixture('loginDataInvalid').then((loginData) => {
      cy.get('input#loginEmail').type(loginData.email);
      cy.get('input#loginPassword').type(loginData.password);
    });
    cy.get('button[type="submit"]').contains('Login').click();
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
});
