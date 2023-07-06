describe("Unsave a post.", () => {
  it("User can unsave a post.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //unsave the post
    cy.get("#more").click();
    cy.findByText("Unsave post").click();
    cy.intercept("/api/posts/unsave/*").as("unsavePost");
    cy.wait("@unsavePost", { timeout: 60000 });
  });
});
