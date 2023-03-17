describe("Logout user.", () => {
  it("User can logout.", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
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
