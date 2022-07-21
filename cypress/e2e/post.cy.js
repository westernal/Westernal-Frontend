describe("create post and delete.", () => {
  it("user can create post and delete it.", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //click on + button
    cy.findByRole("link", { name: "add" }).click();

    //create post
    cy.findByLabelText(/song/i).selectFile(
      "C:/Users/ASUS/Desktop/Rauf_Faik_Lullaby_128.mp3"
    );
    cy.findByPlaceholderText(/title/i).type("new post");
    cy.findByPlaceholderText(/description/i).type("new post arrived");
    cy.findByRole("button", { name: /post/i }).click();
    cy.wait(5000);

    //go to profile
    cy.findByRole("img", { name: /profile/i }).click({ force: true });

    //verify if post was made
    cy.findByText("new post");

    //delete the post
    cy.get("#delete-btn").click();
  });
});
