describe("Edit user", () => {
  it("user can edit his profile", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });
  });
});
