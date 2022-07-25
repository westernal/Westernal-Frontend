describe("search for a user.", () => {
  it("user can search other users", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //click on search button
    cy.findByRole("link", { name: "search" }).click();
    cy.wait(1000);

    //search for a user
    cy.findByRole("textbox").type("alinavidi");

    //check if user exists
    cy.findByText("alinavidi");
  });
});
