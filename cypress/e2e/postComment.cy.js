describe("comment on a post.", () => {
  it("user can comment on posts", async () => {
    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("westernal");
    cy.findByPlaceholderText(/password/i).type("13791379al");
    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(1000);

    //click on comment button
    cy.get("#comments img").click();
    cy.wait(500);

    //post a comment
    cy.findByRole("textbox").type("great post");

    //check if comment added
    cy.findByText("great post");
  });
});
