describe("Create a post.", () => {
  it("User can create a post.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //create a post
    cy.visit("/post/new");
    cy.get("#song").type(
      "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu"
    );
    cy.findByPlaceholderText(/caption/i).type("new post2");
    cy.findByRole("button", { name: /post/i }).click();
    cy.intercept("POST", "/api/posts").as("createPost");
    cy.wait("@createPost", { timeout: 60000 });
  });
});
