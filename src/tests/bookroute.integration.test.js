const express = require("express")
const request = require("supertest");
const bookRoute = require("../routes/bookRoute");

const express = require("express");
const app = express();
app.use("/api/books",bookRoute); 

describe("Integration tests for the books API", () => {

    test("GET /api/books - success - get all the books", () => {
        const res = await
    })

})