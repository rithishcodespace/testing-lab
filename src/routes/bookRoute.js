const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/",bookController.getBooks);
router.post("/api/books",bookController.addBook);

module.exports = router;