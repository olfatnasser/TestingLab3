const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

let request = supertest(app);
describe("todo routes", () => {
  let token
  beforeAll(async () => {
    let user = { name: "mona", email: "mona@test.com", password: "1234" }
    await request.post("/user/signup").send(user)
    let res = await request.post("/user/login").send(user)
    token = res.body.data
  })
  it("GET /todo should respond with status 200 and []", async () => {
    let response = await request.get("/todo");
    expect(response.body.data).toEqual([]);
    expect(response.status).toBe(200);
  });
  it("POST /todo should with no auth status 401 and the msg", async () => {
    let res = await request.post("/todo").send({ title: "have some rest" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/login first/i);
  });
  it("POST /todo should with auth status 201 and the new todo", async () => {

    let res = await request.post("/todo").send({ title: "have some rest" }).set({ authorization: token });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toEqual("have some rest")
  });
  it("GET /todo/id should with respond with status 200 and the todo with id", async () => {
    let res1 = await request.post("/todo").send({ title: "sleep more" }).set({ authorization: token })
    let id = res1.body.data._id
    let res2 = await request.get("/todo/" + id).set({ authorization: token })
    expect(res2.status).toBe(200)
    expect(res2.body.data.title).toBe("sleep more")
  })
  afterAll(async () => {
    await clearDatabase();
  });
});
