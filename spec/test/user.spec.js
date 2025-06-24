const supertest = require("supertest")
const app = require("../..")
const { clearDatabase } = require("../../db.connection")


let request = supertest(app)
describe("user routes", () => {
    it("GET /user should respond with status 200 and []", async () => {
        let response = await request.get("/user")
        expect(response.body.data).toEqual([])
        expect(response.status).toBe(200)
    })
    it("POST /user/signup should respond with 201 and the new user", async () => {
        let mockUser = { name: "Ali", email: "ali@ali.com", password: "1234" }
        let response = await request.post("/user/signup").send(mockUser)
        expect(response.status).toBe(201)
        expect(response.body.data.email).toEqual(mockUser.email)
    })
    it("POST /user/login should respond with status 200 with token", async () => {
        let user = { name: "mona", email: "mona@test.com", password: "1234" }
        await request.post("/user/signup").send(user)
        let res = await request.post("/user/login").send(user)
        expect(res.status).toBe(200)
        expect(res.body.data).toBeDefined()
    })
    it("POST /user/login with wrong input should respond with status 401 with the message", async () => {
        let user = { name: "soha", email: "soha@test.com", password: "1234" }
        await request.post("/user/signup").send(user)
        let res = await request.post("/user/login").send({ email: user.email, password: "xxxx" })
        expect(res.status).toBe(401)
        expect(res.body.message).toMatch(/password/i)
    })
    afterAll(async () => {
        await clearDatabase()
    })
})