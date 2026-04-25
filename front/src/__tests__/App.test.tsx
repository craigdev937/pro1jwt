import { describe, it, expect } from "@rstest/core";
import { render, screen } from "@testing-library/react";
import { App } from "../app/App";

describe("App component", () => {
    it("renders heading and image", () => {
        render(<App />);
        expect(screen.getByText("C. B. Strike"))
            .toBeTruthy();
        const img = screen.getByAltText("C. B. Strike");
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toBeTruthy();
    });
});


