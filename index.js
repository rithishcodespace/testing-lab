require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT,() => console.log(`app runs on http://localhost:${PORT}`));