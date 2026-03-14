const createError = require("http-errors");

exports.simpleMessage = async(req,res,next) => {
    try{
        res.send('working!')
    }
    catch(error){
        next(error);
    }
}

