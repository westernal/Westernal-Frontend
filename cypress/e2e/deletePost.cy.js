describe("Delete a post.", () => {
  it("User can delete post.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //delete the post
    cy.get("#more").click();
    cy.get("#delete-link").click();
    cy.get("#confirm-delete").click();
    cy.intercept("DELETE", "/api/posts/*").as("deletePost");
    cy.wait("@deletePost", { timeout: 60000 });

    //check if post deleted
    cy.findByText("new post2").should("not.exist");
  });
});
