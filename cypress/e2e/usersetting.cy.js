describe("Edit user", () => {
  it("User can edit his/her profile", () => {
    let randomNumber = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //go to settings
    cy.visit("/cypress/setting");

    //change the profile
    cy.fixture("logo.png", { encoding: null }).as("profilePicture");
    cy.get("#image").selectFile("@profilePicture");
    cy.get("#username").clear().type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#bio").clear().type(`cypress test ${randomNumber}`);
    cy.get("#link").clear().type("https://www.westernal.net/cypress");
    cy.findByRole("button", { name: /save/i }).click();
    cy.intercept("api/users/edit/*").as("editUser");
    cy.wait("@editUser", { timeout: 60000 });

    //check if changes happend
    cy.visit("/cypress");
    cy.findByText(`cypress test ${randomNumber}`).should("be.visible");
  });
});
