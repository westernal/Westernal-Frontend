describe("Login user.", () => {
  it("User can login.", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(2000);

    //check if redirected to the home page
    cy.url().should("include", "/home/timeline");
  });
});
