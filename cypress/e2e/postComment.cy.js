describe("comment on a post.", () => {
  it("user can comment on posts and delete it", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(5000);

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

    //delete comment
    cy.get("#delete-btn").click();
    cy.wait(1000);

    //check if comment deleted
    cy.findByText(message).should("not.exist");
  });
});
