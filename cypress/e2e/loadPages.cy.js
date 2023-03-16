describe("Testing pages.", () => {
  it("All pages loads successfuly.", () => {
    //signup
    cy.visit("/user/signup");

    //forgot-password
    cy.visit("/user/forgot-password");
    cy.visit("/user/forgot-password/token");

    //login
    cy.visit("/");
    cy.findByPlaceholderText(/username/i).type("cypress");
    cy.findByPlaceholderText(/password/i).type("11111111");
    cy.findByRole("button", { name: /login/i }).click();
    cy.intercept("/api/users/login").as("login");
    cy.wait("@login", { timeout: 60000 });

    //home
    cy.url().should("include", "/home/timeline");

    //search
    cy.visit("/user/search");

    //notifications
    cy.visit("/user/notifications");

    //profile
    cy.visit("/cypress");
    cy.visit("/westernal");
    cy.visit("/cypress/followers");
    cy.visit("/cypress/following");
    cy.visit("/cypress/saved");
    cy.visit("/cypress/setting");

    //post
    cy.visit("/post/new");
    cy.visit("/post/63d689e481959628b5ec9211");
    cy.visit("/likes/63d689e481959628b5ec9211");
    cy.visit("/comments/63d689e481959628b5ec9211");
  });
});