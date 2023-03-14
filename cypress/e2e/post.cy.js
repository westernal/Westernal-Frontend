describe("Create post and delete post.", () => {
  it("User can create post and delete it.", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(2000);

    //click on + button
    cy.get("#add-btn").click();

    //create post
    cy.get("#song").type(
      "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu"
    );
    cy.findByPlaceholderText(/title/i).type("new post");
    cy.findByPlaceholderText(/description/i).type("new post arrived");
    cy.findByRole("button", { name: /post/i }).click();
    cy.wait(5000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });
    cy.wait(2000);

    //verify if post was made
    cy.findByText("new post").should("be.visible");

    //delete the post
    cy.get("#more").click();
    cy.get("#delete-link").click();
    cy.get("#confirm-delete").click();
    cy.wait(1000);

    //check if post deleted
    cy.findByText("new post").should("not.exist");
  });
});
