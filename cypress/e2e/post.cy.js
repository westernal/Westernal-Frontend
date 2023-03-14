describe("Create post and delete post.", () => {
  it("User can create post and delete it.", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login");

    //click on + button
    cy.visit("/post/new");

    //create post
    cy.get("#song").type(
      "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu"
    );
    cy.findByPlaceholderText(/caption/i).type("new post2");
    cy.findByRole("button", { name: /post/i }).click();
    cy.intercept("POST", "/api/posts").as("createPost");
    cy.wait("@createPost");

    //go to profile
    cy.visit("/cypress");

    //verify if post was made
    cy.findByText("new post2").should("be.visible");

    //delete the post
    cy.get("#more").click();
    cy.get("#delete-link").click();
    cy.get("#confirm-delete").click();
    cy.intercept("DELETE", "/api/posts/*").as("deletePost");
    cy.wait("@deletePost");

    //check if post deleted
    cy.findByText("new post2").should("not.exist");
  });
});
