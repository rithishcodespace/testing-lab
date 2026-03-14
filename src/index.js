require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const PORT = process.env.PORT;
const bookRoute = require("./routes/bookRoute");

app.use(express.json());

app.use(cors({
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(morgan('dev'));

app.use('/api/books',bookRoute);

// error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});


app.listen(PORT,() => console.log(`app runs on http://localhost:${PORT}`));