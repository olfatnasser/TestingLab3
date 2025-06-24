import { render, screen } from "@testing-library/react";
import { expect, afterAll, beforeAll } from "vitest";
import heroesServer from "../../mocks/heoresServer";
import HeroesFromAPI from "./Heroes";
import { http, HttpResponse } from "msw";
import { formatPrice } from "./formatPrice";


describe.skip('formatPrice function', () => {
  it('formats number with default currency and 2 decimals', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  });


  it('formats number with custom currency symbol and decimals', () => {
    const result = formatPrice(98765.4321, '€', 1);
    expect(result).toBe('€98,765.4');
  });


  it('returns empty string for invalid input', () => {
    expect(formatPrice("5")).toBe('')
    expect(formatPrice(NaN)).toBe('');
  });
})





describe.skip('HeroesFromAPI component', () => {

  beforeAll(() => {
    heroesServer.listen();
  });
  afterAll(() => {
    heroesServer.close();
  });
  afterEach(() => {
    heroesServer.resetHandlers();
  });



  it('renders "No heroes available" when API returns empty list', async () => {
    heroesServer.use(
      http.get('http://localhost:3000/heroes', () => {
        return HttpResponse.json([]);
      })
    );
    render(<HeroesFromAPI />)
    const message = await screen.findByText(/No heroes available/i);
    expect(message).toBeInTheDocument();
  });


  it('renders heroes fetched from API', async () => {
    render(<HeroesFromAPI />)
    const message = await screen.findByText(/superman/i);
    expect(message).toBeInTheDocument();
  });


  it('renders error message when API fails', async () => {
    heroesServer.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json({}, { status: 500 })
      }))
    render(<HeroesFromAPI />)
    const error = await screen.findByText(/Failed to fetch heroes/i);
    expect(error).toBeInTheDocument();
  });
});
