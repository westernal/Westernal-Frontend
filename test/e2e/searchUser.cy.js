describe("search for a user.", () => {
  it("user can search other users", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //click on search button
    cy.findByRole("link", { name: "search" }).click();
    cy.wait(1000);

    //search for a user
    cy.findByRole("textbox").type("westernal");
    cy.wait(1000);

    //check if user exists
    cy.findByText("westernal").should("be.visible");
  });
});
