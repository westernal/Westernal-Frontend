const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.westernal.net/",
    retries: {
      runMode: 3,
    },
    video: false,
    screenshotOnRunFailure: false,
    specPattern: [
      "cypress/e2e/loadPages.cy.js",
      "cypress/e2e/signup.cy.js",
      "cypress/e2e/login.cy.js",
      "cypress/e2e/logout.cy.js",
      "cypress/e2e/searchUser.cy.js",
      "cypress/e2e/userSetting.cy.js",
      "cypress/e2e/changePassword.cy.js",
      "cypress/e2e/followUser.cy.js",
      "cypress/e2e/unfollowUser.cy.js",
      "cypress/e2e/createChat.cy.js",
      "cypress/e2e/sendMessage.cy.js",
      "cypress/e2e/createPost.cy.js",
      "cypress/e2e/postComment.cy.js",
      "cypress/e2e/replyComment.cy.js",
      "cypress/e2e/editPost.cy.js",
      "cypress/e2e/savePost.cy.js",
      "cypress/e2e/unsavePost.cy.js",
      "cypress/e2e/deletePost.cy.js",
    ],
  },
});
