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

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click();

    //save the post
    cy.get("#more").click();
    cy.get("#save-post").click();
    cy.intercept("/api/posts/save/*").as("savePost");
    cy.wait("@savePost");

    //go to saved posts
    cy.get("#saved-posts").click();
    cy.intercept("api/users/saved-posts/*").as("getSavedPosts");
    cy.wait("@getSavedPosts");

    //check if post saved
    cy.findByText("new post").should("be.visible");

    //unsave the post
    cy.get("#more").click();
    cy.get("#save-post").click();
    cy.intercept("/api/posts/unsave/*").as("unsavePost");
    cy.wait("@unsavePost");

    //check if comment deleted
    cy.findByText("new post").should("not.exist");
  });
});
