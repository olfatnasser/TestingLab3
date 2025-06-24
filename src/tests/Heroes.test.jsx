import { render, screen } from "@testing-library/react";
import Heroes from "../components/Heroes/Heroes";
describe("Heroes component", () => {
  it("render with no heroes", () => {
    render(<Heroes />)

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
    expect(screen.getByText(/no heroes/i)).toBeInTheDocument()
  });
  it("render with heroes", () => {
    let heroes = [
      { id: 1, name: "superman", strength: 10 },
      { id: 2, name: "batman", strength: 11 },
    ]
    render(<Heroes heroes={heroes} />)

    expect(screen.queryByRole("list")).toBeInTheDocument()
    expect(screen.queryByText(/no heroes/i)).not.toBeInTheDocument()
    let liTags = screen.getAllByRole("listitem")
    expect(liTags).toHaveLength(heroes.length)
    for (let i = 0; i < liTags.length; i++) {

      expect(liTags[i]).toHaveTextContent(heroes[i].name)

    }
  });
});
