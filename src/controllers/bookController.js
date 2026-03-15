const createError = require("http-errors");
const bookData = require("../data/books.json");

exports.simpleMessage = async(req,res,next) => {
    try{
        res.send(bookData);
    }
    catch(error){
        next(error);
    }
}

