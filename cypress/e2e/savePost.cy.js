describe("Save a post.", () => {
  it("User can save a post.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //save the post
    cy.get("#more").click();
    cy.findByText("Save post").click();
    cy.intercept("/api/posts/save/*").as("savePost");
    cy.wait("@savePost", { timeout: 60000 });
  });
});
