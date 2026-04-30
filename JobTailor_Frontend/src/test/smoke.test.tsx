import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function SmokeComponent() {
  return <button type="button">Frontend Smoke Test</button>;
}

describe("frontend smoke", () => {
  it("renders a basic component in jsdom", () => {
    render(<SmokeComponent />);
    expect(
      screen.getByRole("button", { name: "Frontend Smoke Test" }),
    ).toBeInTheDocument();
  });
});
