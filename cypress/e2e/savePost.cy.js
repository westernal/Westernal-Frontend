describe("Save a post.", () => {
  it("User can save a post and unsave it", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(5000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });
    cy.wait(5000);

    //save the post
    cy.get("#more").click();
    cy.get("#save-post").click();
    cy.wait(5000);

    //check if post saved
    cy.get("#saved-posts").click();
    cy.wait(5000);
    cy.findByText("new post").should("be.visible");

    //unsave the post
    cy.get("#more").click();
    cy.get("#save-post").click();
    cy.wait(5000);

    //check if comment deleted
    cy.findByText("new post").should("not.exist");
  });
});
