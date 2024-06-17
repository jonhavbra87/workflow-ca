describe('Logout', () => {
  beforeEach(() => {
    cy.visitHome();
    cy.showLoginForm();
    cy.loginWithTestUser();
    cy.isLoggedIn();
  });

  it('allows a valid user to log out', () => {
    cy.logout();
    cy.isLoggedOut();
  });
});
