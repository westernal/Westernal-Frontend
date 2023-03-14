describe("Save a post.", () => {
  it("User can save a post and unsave it", () => {
    let message = 1000 * Math.random();
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login");
    cy.url().should("include", "/home/timeline");

    //save the post
    cy.get("#more").click();
    cy.findByText("Save post").click();
    cy.intercept("/api/posts/save/*").as("savePost");
    cy.wait("@savePost");

    //unsave the post
    cy.get("#more").click();
    cy.findByText("Unsave post").click();
    cy.intercept("/api/posts/unsave/*").as("unsavePost");
    cy.wait("@unsavePost");
  });
});
