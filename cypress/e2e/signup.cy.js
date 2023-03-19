describe("Signup user.", () => {
  it("User can signup.", () => {
    //signup
    cy.visit("/user/signup");
    cy.get("#username").type("newtestuser");
    cy.get("#email").type("newtestuser@gmail.com");
    cy.get("#password").type("11111111");
    cy.get("#confirm-password").type("11111111");
    cy.findByRole("button", { name: /Signup/i }).click();
    cy.intercept("/api/users/signup").as("signup");
    cy.wait("@signup", { timeout: 60000 });
  });
});
