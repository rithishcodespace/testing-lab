const express = require("express")
const request = require("supertest");
const bookRoute = require("../routes/bookRoute");

const app = express();
app.use(express.json())
app.use("/api/books",bookRoute); 

describe("Integration tests for the books API", () => {

    test("GET /api/books - success - get all the books", async() => {

        const {body, statusCode} = await request(app).get("/api/books")
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    author: expect.any(String)
                })
            ])
        )

        expect(statusCode).toBe(200);
    })

    test("POST /api/books - failure on invalid post body", async() => {

        const {body, statusCode} = await request(app).post("/api/books").send({
            name: "",
            author: "Kamala"
        })

        expect(statusCode).toBe(400);
        expect(body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    msg: "Book name is required",
                    path: "name"
                })
            ])
        )

    })

    test("POST /api/books - success", async() => {

        const{body, statusCode} = await request(app).post("/api/books").send({
            name: "Rhaegal targerian",
            author: "Valar Morgolis"
        })

        expect(statusCode).toBe(201);
        expect(body).toEqual({
            name: "Rhaegal targerian",
            author: "Valar Morgolis",
            id: expect.any(Number)
        })

    })

})