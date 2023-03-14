describe("reply a comment.", () => {
  it("Uer can reply a comment.", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(2000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });
    cy.wait(2000);

    //click on comment button
    cy.get("#comments").click();
    cy.wait(500);

    //post a comment
    cy.findByRole("textbox").type(message);
    cy.findByRole("button", { name: /post/i }).click();
    cy.wait(1000);

    //check if comment added
    cy.findByText(message).should("be.visible");

    //reply on the comment
    cy.get("#reply-cm").click();
    cy.findByRole("textbox").type("test");
    cy.findByRole("button", { name: /post/i }).click();
    cy.wait(1000);

    //check if reply added
    cy.findByText("test").should("be.visible");

    //delete comment
    cy.get("#delete-btn").click();
    cy.wait(1000);

    //check if comment deleted
    cy.findByText(message).should("not.exist");
  });
});
