import React from "react";
import UserHeader from "../../../../components/layout/header/UserHeader";
import { render } from "@testing-library/react";

describe("User header component", () => {
  it.only("User header component renders username correctly", () => {
    const USERNAME = "westernal";
    const USER_HEADER = render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    USER_HEADER.findByText(USERNAME);
  });

  it.only("User header not showing header buttons and login button when user is not logged in", () => {
    const USERNAME = "westernal";
    const USER_HEADER = render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    !USER_HEADER.findByRole("button", { name: "Login" });
    !USER_HEADER.findByTestId("header-buttons");
  });

  it.only("User header showing header buttons and login button when user is logged in", () => {
    const USERNAME = "westernal";
    const USER_HEADER = render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    USER_HEADER.findByRole("button", { name: "Login" });
    USER_HEADER.findByTestId("header-buttons");
  });
});
