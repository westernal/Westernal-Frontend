import React from "react";
import PostForm from "../../../../components/authentication/form/PostForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";

describe("Post Form", () => {
  it.only("Returns error when song URL is not included", () => {
    toast.error = jest.fn();
    const ERROR_MESSAGE = "Song's URL must be included!";
    render(<PostForm publish={jest.fn()} changeLoader={jest.fn()} />);

    const postButton = screen.getByRole("button", { name: /Post/ });
    postButton.click();

    expect(toast.error).toHaveBeenCalled();
  });

  it.only("Returns error when song URL is not supported", () => {
    toast.error = jest.fn();
    const ERROR_MESSAGE = "Sorry, we don't support this link.";
    const postForm = render(
      <PostForm publish={jest.fn()} changeLoader={jest.fn()} />
    );

    const urlInput = postForm.getByPlaceholderText("Song's URL");
    fireEvent.change(urlInput, {
      target: { value: "https://www.google.com/" },
    });

    const postButton = postForm.getByRole("button", { name: /Post/ });
    postButton.click();

    expect(toast.error).toHaveBeenCalled();
  });
});
