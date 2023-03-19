describe("Change password.", () => {
  it("User can change password.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type("cypress");
    cy.get("#password").type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });

    //check if redirected to the home page
    cy.url().should("include", "/home/timeline");

    //go to settings
    cy.visit("/cypress/setting");

    //click change password button
    cy.findByRole("button", { name: /Change password/i }).click();

    //enter new password and confirm it
    cy.get("#password").type("11111111");
    cy.get("#confirm-password").type("11111111");
    cy.findByText("Change password").click();

    //check if password changed correctly
    cy.intercept("/api/users/edit/password/*").as("changePassword");
    cy.wait("@changePassword");
  });
});
