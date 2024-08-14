describe('Posts', () => {
  beforeEach(() => {
    cy.viewFeed();
  });

  it('shows a list of posts', () => {
    cy.shouldShowListOfPosts();
  });

  it('shows a single post', () => {
    cy.showSinglePost();
  });

  it('allows a user to create, update, and delete a new post', () => {
    cy.visit('/?view=post');

    // Give the page time to load
    cy.wait(200);

    // Fill out the post form
    cy.fillOutPostForm();

    cy.get('#postForm button[type=submit]').click();

    // Intercept API-kall to confirm that the post was created
    cy.intercept('POST', Cypress.env('API_URL') + '/api/v1/social/posts').as(
      'createPost',
    );

    cy.url().should('include', 'postId=');

    // Open the edit tab
    cy.get('#nav-tab-edit').click();
    cy.get('#nav-edit').should('be.visible');

    // Fill out the updated post form
    cy.fillOutUpdatedPostForm();

    // Click the update button
    cy.get('#nav-edit').within(() => {
      cy.get('[data-action=update]')
        .first()
        .should('be.visible')
        .click({ multiple: true });
    });

    // Give the update time to complete
    cy.wait(2000);

    // Delete the post
    cy.deletePost();
    // Give the deletion time to complete
    cy.wait(2000);
    // Confirm that the list of posts is visible
    cy.shouldShowListOfPosts();
  });

  // it('allows a user to like a post', () => {
});

//Check the profile post
