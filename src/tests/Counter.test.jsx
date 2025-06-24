import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter/Counter";
import userEvent from "@testing-library/user-event";

describe("Counter component",()=>{
    it("render with 3 buttons and counter =0",()=>{
        render(<Counter />)

        expect(screen.getAllByRole("button")).toHaveLength(3)
        // expect(screen.getByText(0)).toBeDefined()
        expect(screen.getByRole("heading")).toHaveTextContent(0)
    })
    it("render and change counter value correctly",async ()=>{
        render(<Counter />)
        // access btn +
       let btnInc= screen.getByRole("button",{name:"Increment"})
        // click btn
       await userEvent.click(btnInc)
       await userEvent.click(btnInc)
        // counter=1
        expect(screen.getByRole("heading")).toHaveTextContent(2)

        let btnDec= screen.getByRole("button",{name:"Decrement"})
        await userEvent.click(btnDec)
        expect(screen.getByRole("heading")).toHaveTextContent(1)
    })
})