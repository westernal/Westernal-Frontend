describe("Edit user", () => {
  it("User can edit his/her profile", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login");

    //go to settings
    cy.visit("/cypress/setting");

    //change the profile
    cy.get("#image").selectFile(
      "C:/Users/ASUS/Desktop/Folders/Pictures/WhatsApp Image 2022-05-24 at 9.30.20 PM.jpeg"
    );
    cy.get("#username").clear().type("cypress");
    cy.get("#bio").clear().type("cypress test");
    cy.get("#link").clear().type("https://www.westernal.net/cypress");
    cy.findByRole("button", { name: /save/i }).click();
  });
});
