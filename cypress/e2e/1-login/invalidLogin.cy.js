describe('Invalid Login attempts', () => {
  beforeEach(() => {
    cy.visitHome();
    cy.showLoginForm();
  });

  it('does not allow login with invalid credentials (non-Noroff email)', () => {
    cy.wait(500);
    cy.fixture('loginDataInvalid').then((loginData) => {
      cy.fillLoginForm(loginData);
    });
    cy.submitLoginForm();
    cy.validateLoginForm();
  });

  it('does not allow login with invalid credentials (wrong password)', () => {
    cy.wait(500);
    cy.fixture('loginData401').then((loginData) => {
      cy.fillLoginForm(loginData);
    });
    cy.interceptLoginRequest();
    cy.submitLoginForm();
    cy.validateLoginRequest(401);
  });

  it('does not allow login with invalid credentials (non-Noroff email)', () => {
    cy.wait(500);
    cy.fixture('loginDataInvalid').then((loginData) => {
      cy.fillLoginForm(loginData);
    });
    cy.submitLoginForm();
    cy.validateLoginForm();
  });
});
