const createError = require("http-errors");
const bookData = require("../data/books.json");
const {check,validationResult} = require("express-validator");

exports.getBooks = async(req,res,next) => {
    try{
        res.send(bookData);
    }
    catch(error){
        next(error);
    }
}

exports.addBook = [
    
    check('name','Book name is required').not().isEmpty(), // check if the name field is empty, if -> Book name is required
    check('author','Author name is required').not().isEmpty(), // check if the author field is empty, if -> author is required

    (req,res,next) => {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }

            let newId = bookData.length + 1;

            bookData.push({
                name: req.body.name,
                author: req.body.author,
                id: newId
            });

            res.status(201).json({
                name: req.body.name,
                author: req.body.author,
                id: newId
            });
        }
        catch(error){
            next(error);
        }
    }
]

exports.updateBook = [
    check('name','Book name is required').not().isEmpty(),
    check('author', 'Author name is required').not().isEmpty(),

    (req,res,next) => {
        try{
            const {id} = req.params;
            const{name,author} = req.body;

            const foundBook = bookData.find((book) => book.id === Number(id));

            if(!foundBook){
                return res.status(404).json({
                    error: true,
                    message: "Book not found!"
                })
            }

            res.status(200).json({
                message: "Book details updated successfully!"
            })
        }
        catch(error){
            next(error);
        }
    }
]