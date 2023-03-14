describe("Follow a user.", () => {
  it("User can follow another user.", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //go to another user's profile
    cy.visit("/testuser2424");

    //follow user
    cy.get("#follow-btn").click();
    cy.intercept("/api/users/follow/*").as("followUser");
    cy.wait("@followUser", { timeout: 60000 });
  });
});
