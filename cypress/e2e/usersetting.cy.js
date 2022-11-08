describe("Edit user", () => {
  it("user can edit his profile", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(5000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });
    cy.wait(1000);

    //click setting button
    cy.findByRole("img", { name: /setting/i }).click();

    //change the profile
    cy.get("#image").selectFile(
      "C:/Users/ASUS/Desktop/Folders/Pictures/WhatsApp Image 2022-05-24 at 9.30.20 PM.jpeg"
    );
    // cy.get("#changeUsername").clear().type("cypress");
    cy.get("#bio").clear().type("cypress test");
    cy.get("#link").clear().type("https://www.westernal.net/cypress/setting");
    cy.findByRole("button", { name: /save/i }).click();
  });
});
