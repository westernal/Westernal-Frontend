import React from "react";
import PostOptions from "../../../../components/posts/options/PostOptions";
import { render, screen } from "@testing-library/react";
import { PostProvider } from "../../../../context/postContext";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Post options component", () => {
  it.only("Post options shows delete option when the post is deletable", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    const mockFn = jest.fn();
    render(
      <PostProvider post={{ _id: 0 }}>
        <PostOptions
          onDelete={mockFn}
          isLoggedIn={false}
          deletable={true}
          onUnsave={mockFn}
        />
      </PostProvider>
    );

    const deleteItem = screen.getByText("Delete post");
    expect(deleteItem).toBeVisible();
  });
});
