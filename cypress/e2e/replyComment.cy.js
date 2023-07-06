describe("reply a comment.", () => {
  it("User can reply a comment.", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.get("#username").type(Cypress.env("CYPRESS_USERNAME"));
    cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"));
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //click on comment button
    cy.get("#comments").click();

    //post a comment
    cy.findByRole("textbox").type(message);
    cy.findByRole("button", { name: /post/i }).click();
    cy.intercept(`api/comments`).as("postComment");
    cy.wait("@postComment", { timeout: 60000 });

    //check if comment added
    cy.findByText(message).should("be.visible");

    //reply on the comment
    cy.get("#reply-cm").click();
    cy.findByRole("textbox").type("test");
    cy.findByRole("button", { name: /post/i }).click();
    cy.intercept(`api/comments/replies`).as("postReply");
    cy.wait("@postReply", { timeout: 60000 });

    //check if reply added
    cy.findByText("test").should("be.visible");

    //delete comment
    cy.get("#delete-btn").click();
    cy.intercept("DELETE", `api/comments/*`).as("deleteComment");
    cy.wait("@deleteComment", { timeout: 60000 });

    //check if comment deleted
    cy.findByText(message).should("not.exist");
  });
});
