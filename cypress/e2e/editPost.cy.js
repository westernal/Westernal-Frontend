describe("Edit post.", () => {
  it("User can Edit post.", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //edit the post
    cy.get("#more").click();
    cy.findByText("Edit post").click();
    cy.get("#caption").type("Testing caption");
    cy.findByText("Save").click();
    cy.intercept("/api/posts/edit/*").as("editPost");
    cy.wait("@editPost", { timeout: 60000 });
  });
});
