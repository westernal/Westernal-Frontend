describe("Search for a user.", () => {
  it("User can search other users", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login");

    //click on search button
    cy.findByRole("link", { name: "search" }).click();

    //search for a user
    cy.findByRole("textbox").type("westernal");
    cy.intercept("/api/users/search/westernal").as("searchUser");
    cy.wait("@searchUser");

    //check if user exists
    cy.findByText("westernal").should("be.visible");
  });
});
