describe("create post", () => {
  it("user can create post", () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();

    //click on + button
    cy.findByRole("link", { name: "add" }).click();

    //add inputs and click post
    cy.findByLabelText(/song/i).selectFile(
      "C:/Users/ASUS/Desktop/Rauf_Faik_Lullaby_128.mp3"
    );
    cy.findByPlaceholderText(/title/i).type("new post");
    cy.findByPlaceholderText(/description/i).type("new post arrived");
    cy.findByRole("button", { name: /post/i }).click();

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click();

    //verify if post was made
    cy.findAllByText("new post").should("be.visible");
  });
});
