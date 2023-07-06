describe("Send a message.", () => {
  it("User can Send a message.", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //click on chat button
    cy.visit("/user/chats/645a240c007b40d82c5520e6");

    //send message
    cy.findByRole("textbox").type(message);
    cy.findByRole("button", { name: /send/i }).click();
    cy.wait(6000);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    //check if message exists
    cy.findByText(message).should("be.visible");
  });
});
