import  calculateHeroStrengthPower  from "../utils/heroStrength"

describe("calculateHeroStrengthPower function",()=>{
    it("should return (weak) when passing 9",()=>{
        expect(calculateHeroStrengthPower(9)).toMatch(/weak/i)
    })
    it("should return (strong) when passing 12",()=>{
        expect(calculateHeroStrengthPower(12)).toMatch(/strong/i)
    })
    it("should return (unbelievable) when passing 22",()=>{
        expect(calculateHeroStrengthPower(22)).toMatch(/unbelievable/i)
    })
})