describe("Search for a user.", () => {
  it("User can search other users", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //click on search button
    cy.visit("/user/search");

    //search for a user
    cy.findByRole("searchbox").type("westernal");
    cy.intercept("/api/users/search?username=westernal").as("searchUser");
    cy.wait("@searchUser", { timeout: 60000 });

    //check if user exists
    cy.findByText("westernal").should("be.visible");
  });
});
