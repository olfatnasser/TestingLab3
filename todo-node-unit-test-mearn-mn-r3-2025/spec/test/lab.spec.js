
const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

describe("lab testing:", () => {
    let request = supertest(app);
    let todoId;
    let token


    describe("users routes:", () => {
        beforeAll(async () => {
            let user = { name: "mona", email: "mona@test.com", password: "1234" }
            await request.post("/user/signup").send(user)
            let res = await request.post("/user/login").send(user)
            token = res.body.data;

            const todoRes = await request.post("/todo/").send({ title: "first todo" }).set({ authorization: token });
            todoId = todoRes.body.data._id;
        })


        // Note: user name must be sent in req query not req params
        it("GET /user/search should respond with the correct user with the name requested", async () => {
            const res = await request.get("/user/search?name=mona").set({ authorization: token });
            expect(res.status).toBe(200);
            expect(res.body.data.name).toEqual("mona");
        })


        it("GET /user/search with invalid name should respond with status 200 and a message", async () => {
            const res = await request.get("/user/search?name=maryam").set({ authorization: token });
            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/There is no user/i);
        })
    })


    describe("todos routes:", () => {
        it("PATCH /todo/ with id only should respond with res status 400 and a message", async () => {
            let res = await request.patch("/todo/" + todoId).send({}).set({ authorization: token })
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/must provide title and id to edit todo/i);
        })


        it("PATCH /todo/ with id and title should respond with status 200 and the new todo", async () => {
            let res = await request.patch("/todo/" + todoId).send({ title: "make Work" }).set({ authorization: token })
            expect(res.status).toBe(200);
            expect(res.body.data.title).toEqual("make Work");
        })


        it("GET  /todo/user should respond with the user's all todos", async () => {
            let res = await request.get("/todo/user").set({ authorization: token })
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
        })


        it("GET  /todo/user for a user hasn't any todo, should respond with status 200 and a message", async () => {
            const user = { name: "empty", email: "empty@test.com", password: "1234" };
            await request.post("/user/signup").send(user);
            const resLogin = await request.post("/user/login").send(user);
            const emptyToken = resLogin.body.data;
            const res = await request.get("/todo/user").set({ authorization: emptyToken });
            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/couldn't find any todos/i);
        })
    })


    afterAll(async () => {
        await clearDatabase();
    });
})