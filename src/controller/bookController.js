const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const mongoose = require("mongoose")
const ObjectId = require('mongoose').Types.ObjectId




const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createBook = async function (req, res) {
    try {

        let data = req.body
        let { name, ISBN, authorId } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mandatory" })
        }
        // if (!data.name) {
        //     return res.status(400).send({ status: false, msg: "Name is mandatory" })
        // }
        if (!data.authorId) {
            return res.status(400).send({ status: false, msg: "author ID  is mandatory" })
        }
        if (!data.ISBN) {
            return res.status(400).send({ status: false, msg: "ISBN is mandatory" })
        }
        let uniqueISBN = await bookModel.findOne({ ISBN })
        if (uniqueISBN) {
            return res.status(400).send({ status: false, msg: "this ISBN is Already used please use unique ISBN" })
        }

        let createdBook = await bookModel.create(data)
        return res.status(201).send({ status: true, msg: "book is created", data: createdBook })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }

}

module.exports.createBook = createBook;

const getBook = async function (req, res) {
    try {
        let data = await bookModel.find({ isDeleted: false }).collation({ locale: "en" })
        res.status(200).send({ status: true, msg: "list of all books", data: data })
        if (!data) {
            return res.status(404).send({ status: false, msg: "list of book is not available" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.getBook = getBook;

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.id
        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: "please provide book ID" })
        }
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "please provide valid Book ID" })
        }
        let data = await bookModel.findById({ _id: bookId })
        if (!data) {
            return res.status(404).send({ status: false, message: "no documents  found" })
        }
        return res.status(200).send({ status: true, msg: "Book and his Author", data: data })

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module, exports.getBookById = getBookById


const updateBook = async function (req, res) {
    try {

        let bookId = req.params.id
        let data = req.body;
        let { name, ISBN } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mandatory" })
        }
        // if (!data.name) {
        //     return res.status(400).send({ status: false, msg: "Name is mandatory" })
        // }

        if (!data.ISBN) {
            return res.status(400).send({ status: false, msg: "ISBN is mandatory" })
        }
        let uniqueISBN = await bookModel.findOne({ ISBN })
        if (uniqueISBN) {
            return res.status(400).send({ status: false, msg: "this ISBN is Already used please use unique ISBN" })
        }
        let updatedBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: data }, { new: true })
        return res.status(201).send({ status: true, msg: "book is updated", data: updatedBook })

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.updateBook = updateBook;


const bookDelete = async function (req, res) {
    try {
        let bookId = req.params.bookId

        let Deletbook = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!Deletbook) {
            return res.status(404).send({ status: false, message: 'book not found or already deleted' })
        }
        let bookDeleted = await bookModel.findOneAndUpdate({ _id: bookId }, { isDeleted: true }, { new: true })

        return res.status(200).send({ status: true, message: 'sucessfully deleted', data: bookDeleted })

    } catch (err) {

    }
}
module.exports.bookDelete = bookDelete;
