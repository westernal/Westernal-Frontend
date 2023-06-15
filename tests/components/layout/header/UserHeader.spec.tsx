import React from "react";
import UserHeader from "../../../../components/layout/header/UserHeader";
import { render } from "@testing-library/react";

describe("User header component", () => {
  it.only("User header component renders username correctly", () => {
    const USERNAME = "westernal";
    const USER_HEADER = render(
      <UserHeader
        username="westernal"
        isVerified={true}
        isLoggedIn={false}
        isUserSelf={false}
      />
    );

    USER_HEADER.findByText(USERNAME);
  });
});
