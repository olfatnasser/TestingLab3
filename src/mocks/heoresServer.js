import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node'


const handlers = [
    http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json([
            { id: 1, name: "superman", strength: 10 },
            { id: 2, name: "batman", strength: 11 },
        ], { status: 200 })
    })
]

let heroesServer = setupServer(...handlers)

export default heroesServer