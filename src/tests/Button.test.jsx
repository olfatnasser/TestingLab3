import { render, screen } from "@testing-library/react";

import Button from "../components/Button/Button"
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
describe("Button component",()=>{
    it("renders correctly",()=>{
        render(<Button > click me </Button>)

       expect( screen.getByRole("button")).toHaveTextContent(/click me/i)
    })
    it("render with handler click event",async ()=>{
       let handleClick= vi.fn()
        render(<Button onClick={handleClick} >click me</Button>)
        let btn=screen.getByRole("button")
        expect(btn).toBeInTheDocument()
        
        await userEvent.click(btn)

        expect(handleClick).toHaveBeenCalled()
    })
})