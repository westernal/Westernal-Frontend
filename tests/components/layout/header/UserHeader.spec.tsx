import React from "react";
import UserHeader from "../../../../components/layout/header/UserHeader";
import { render, screen } from "@testing-library/react";

describe("User header component", () => {
  it.only("User header component renders username correctly", () => {
    const USERNAME = "westernal";
    const userHeader = render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    userHeader.findByText(USERNAME);
  });

  it.only("User header not showing header buttons and showing login button when user is not logged in", () => {
    const USERNAME = "westernal";
    render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    const headerButtons = screen.queryByRole("header-buttons");

    expect(headerButtons).toBeFalsy();
    expect(loginButton).toBeVisible();
  });

  it.only("User header showing header buttons when user is logged in", () => {
    const USERNAME = "westernal";
    render(
      <UserHeader
        username={USERNAME}
        isVerified={true}
        isLoggedIn={true}
        isUserSelf={true}
      />
    );

    const headerButtons = screen.getByTestId("header-buttons");
    expect(headerButtons).toBeVisible();
  });
});
