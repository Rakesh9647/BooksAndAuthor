const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const bookController = require("../controller/bookController")


router.post('/author', authorController.createAuthor)

router.post('/book', bookController.createBook);

router.get('/author', authorController.getAuthor);

router.get('/book', bookController.getBook)

router.get('/author/:id', authorController.getBookByAuthorId)

router.get('/book/:id', bookController.getBookById)

router.patch('/author/:id', authorController.updateAuthor)

router.patch('/book/:id', bookController.updateBook)

router.delete('/author/:id', authorController.authorDelete)

router.delete('/book/:id', bookController.bookDelete)

module.exports = router