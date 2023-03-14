describe("Commenting on a post.", () => {
  it("Uer can comment on posts and delete it", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login");

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click();

    //click on comment button
    cy.get("#comments").click();

    //post a comment
    cy.findByRole("textbox").type(message);
    cy.findByRole("button", { name: /post/i }).click();
    cy.intercept(`api/comments`).as("postComment");
    cy.wait("@postComment");

    //check if comment added
    cy.findByText(message).should("be.visible");

    //delete comment
    cy.get("#delete-btn").click();
    cy.intercept("DELETE", `api/comments/*`).as("deleteComment");
    cy.wait("@deleteComment");

    //check if comment deleted
    cy.findByText(message).should("not.exist");
  });
});
