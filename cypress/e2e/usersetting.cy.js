describe("Edit user", () => {
  it("User can edit his/her profile", () => {
    //login
    cy.visit("/");
    cy.get("#username").type("cypress");
    cy.get("#password").type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //go to settings
    cy.visit("/cypress/setting");

    //change the profile
    cy.fixture("logo.png", { encoding: null }).as("profilePicture");
    cy.get("#image").selectFile("@profilePicture");
    cy.get("#username").clear().type("cypress");
    cy.get("#bio").clear().type("cypress test");
    cy.get("#link").clear().type("https://www.westernal.net/cypress");
    cy.findByRole("button", { name: /save/i }).click();
  });
});
