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
});
