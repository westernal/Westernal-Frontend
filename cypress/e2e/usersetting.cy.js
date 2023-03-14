describe("Edit user", () => {
  it("User can edit his/her profile", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //go to settings
    cy.visit("/cypress/setting");

    //change the profile
    // cy.get("#image").selectFile(
    //   "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ast2p3i2zthwnz5skluw.png"
    // );
    cy.get("#username").clear().type("cypress");
    cy.get("#bio").clear().type("cypress test");
    cy.get("#link").clear().type("https://www.westernal.net/cypress");
    cy.findByRole("button", { name: /save/i }).click();
  });
});
