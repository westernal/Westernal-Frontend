describe("Signup user.", () => {
  it("User can signup.", () => {
    console.log(process.env);
    //signup
    cy.visit("/user/signup");
    cy.get("#username").type("newtestuser");
    cy.get("#email").type("newtestuser@gmail.com");
    cy.get("#password").type("11111111");
    cy.get("#confirm-password").type("11111111");
    cy.findByRole("button", { name: /Signup/i }).click();
    cy.intercept("/api/users/signup", {
      body: {
        token: Cypress.env("TOKEN"),
      },
      statusCode: 201,
    }).as("signup");
    cy.wait("@signup", { timeout: 60000 });

    //check if signed up
    cy.visit("/home/timeline");
  });
});
