import { screen } from "@testing-library/preact";
import { expect, it } from "vitest";
import { Footer } from "./footer";
import { renderWithI18n } from "./test/render";

it("credits the author and links to the source", () => {
  renderWithI18n(<Footer />);
  expect(screen.getByText("Built by sjp").getAttribute("href")).toBe("https://sjp.co.nz");
  const links = screen.getAllByRole("link");
  expect(links.map((link) => link.getAttribute("href"))).toContain(
    "https://github.com/sjp/getwifi-web",
  );
  for (const link of links) {
    expect(link.getAttribute("rel")).toBe("noreferrer noopener");
  }
});
