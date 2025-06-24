import { render, screen, waitFor } from "@testing-library/react";
import JokeFetcher from "../components/Joke/Joke";
import { afterAll, beforeAll } from "vitest";
import server from "../mocks/server";
import { http } from "msw";

describe("Joke component", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  
  it("render with response", async () => {
    render(<JokeFetcher />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);
    //    await waitFor(()=>{
    //         expect(screen.getByRole("heading")).toHaveTextContent(/funny joke/i)

    //     })
    //or
    let h1 = await screen.findByRole("heading");
    expect(h1).toHaveTextContent(/funny joke/i);
  });
  it("render with response error", async () => {
    //before rendering component
    //override the request handler in server.js to make response with error
    server.use(
        http.get("https://api.chucknorris.io/jokes/random",()=>{
        return HttpResponse.json({},{status:500})
    }))
    render(<JokeFetcher />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);
    
    
    //then check if error is rendered
    let h1 = await screen.findByRole("heading");
    expect(h1).toHaveTextContent(/failed/i);
  });
});
