describe("Edit user", () => {
  it("user can edit his profile", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });

    //click setting button
    cy.findByRole("img", { name: /setting/i }).click();

    //change the profile
    cy.get("#image").selectFile(
      "C:/Users/ASUS/Desktop/Folders/Pictures/WhatsApp Image 2022-05-24 at 9.30.20 PM.jpeg"
    );
    cy.get("#username").type("westernal");
    cy.get("#bio").type("founder of westernal");
    cy.get("#password").type("13791379al");
    cy.get("#rpassword").type("13791379al");
    cy.findByRole("button", { name: /edit/i }).click();
  });
});
