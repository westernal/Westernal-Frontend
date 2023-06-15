import React from "react";
import Index from "../../pages/index";
import { render } from "@testing-library/react";

describe("Sign in page", () => {
  it.only("Sign in page renders correctly", () => {
    HTMLCanvasElement.prototype.getContext = jest.fn();
    render(<Index />);
  });
});
