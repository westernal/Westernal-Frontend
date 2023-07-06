describe("Edit post.", () => {
  it("User can Edit post.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //edit the post
    cy.get("#more").click();
    cy.findByText("Edit post").click();
    cy.intercept("GET", "/api/posts/*").as("getPost");
    cy.wait("@getPost", { timeout: 60000 });
    cy.get("#caption").type("Testing caption");
    cy.findByText("Save").click();
    cy.intercept("/api/posts/edit/*").as("editPost");
    cy.wait("@editPost", { timeout: 60000 });
  });
});
