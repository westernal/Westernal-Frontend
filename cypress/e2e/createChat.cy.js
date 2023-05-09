describe("Create a new chat.", () => {
  it("User can create a new chat.", () => {
    //login
    cy.visit("/");
    cy.get("#username").type("cypress");
    cy.get("#password").type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });
    cy.url().should("include", "/home/timeline");

    //click on chat button
    cy.visit("/user/chats/new");

    //find user
    cy.findByRole("textbox").type("testuser2424");
    cy.findByText("testuser2424").click();
    cy.intercept("api/chats/create").as("createChat");
    cy.wait("@createChat", { timeout: 60000 });

    //check if chat exists
    cy.visit("/user/chats");
    cy.findByText("testuser2424").should("be.visible");
  });
});
