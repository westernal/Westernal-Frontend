describe("Unfollow a user.", () => {
  it("User can unfollow another user.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //go to another user's profile
    cy.visit("/testuser2424");

    //follow user
    cy.get("#unfollow-btn").click();
    cy.intercept("/api/users/unfollow/*").as("unfollowUser");
    cy.wait("@unfollowUser", { timeout: 60000 });
  });
});
