describe("Logout user.", () => {
  it("User can logout.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });

    //check if redirected to the home page
    cy.url().should("include", "/home/timeline");

    //visit settings
    cy.visit("/cypress/setting");

    //logout
    cy.get("#logout").click();

    //check if logged out
    cy.url().should("eq", "https://www.westernal.net/");
  });
});
