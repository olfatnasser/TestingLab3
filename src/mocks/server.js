import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node'


const handlers=[
    http.get("https://api.chucknorris.io/jokes/random",()=>{
        return HttpResponse.json({value:"funny joke hahaha"},{status:200})
    })
]

let server=setupServer(...handlers)

export default server
