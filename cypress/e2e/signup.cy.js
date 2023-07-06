describe("Signup user.", () => {
  it("User can signup.", () => {
    console.log(process.env);
    //signup
    cy.visit("/user/signup");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#email").type("newtestuser@gmail.com");
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.get("#confirm-password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /Signup/i }).click();
    cy.intercept("/api/users/signup", {
      body: {
        token: Cypress.env("CYPRESS_TOKEN"),
      },
      statusCode: 201,
    }).as("signup");
    cy.wait("@signup", { timeout: 60000 });

    //check if signed up
    cy.visit("/home/timeline");
  });
});
