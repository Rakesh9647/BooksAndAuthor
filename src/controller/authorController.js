const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");
const bookModel = require("../models/bookModel");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const createAuthor = async function (req, res) {
    try {

        let data = req.body
        let { name } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mandatory" })
        }
        // if(!data.name){
        //     return res.status(400).send({ status: false, msg: "Name is mandatory" })
        // }
        let uniqueName = await authorModel.findOne({ name })
        if (uniqueName) {
            return res.status(400).send({ status: false, msg: "name is already present" })
        }

        let createdAuthor = await authorModel.create(data)
        return res.status(201).send({ status: true, msg: "author is created", data: createdAuthor })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports.createAuthor = createAuthor;


const getAuthor = async function (req, res) {
    try {
        let data = await authorModel.find({})
        console.log(data)
        if (!data) {
            return res.status(404).send({ status: false, msg: "list of author is not available" })
        }
        return res.status(200).send({ status: true, msg: "list of all author", data: data })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.getAuthor = getAuthor;


const getBookByAuthorId = async function (req, res) {
    try {

        let authorId = req.params.id

        if (!isValid(authorId)) {
            return res.status(400).send({ status: false, message: "please provide authorID" })
        }
        if (!isValidObjectId(authorId)) {
            return res.status(400).send({ status: false, message: "please provide valid AuthorID" })
        }
        const bookData = await bookModel.find({ authorId: authorId})
        if (!bookData) {
            return res.status(404).send({ status: false, message: "no documents  found" })
        }
        return res.status(200).send({ status: true, msg: "list of book by author id", data: bookData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.getBookByAuthorId = getBookByAuthorId;


const updateAuthor = async function (req, res) {
    try {
        let authorId = req.params.id;
        let data = req.body
        let { name } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mandatory" })
        }
        if (!data.name) {
            return res.status(400).send({ status: false, msg: "Name is mandatory" })
        }
        let uniqueName = await authorModel.findOne({ name })
        if (uniqueName) {
            return res.status(400).send({ status: false, msg: "name is already present" })
        }
        let updateData = await authorModel.findByIdAndUpdate({ _id: authorId }, { $set: data }, { new: true })
        return res.status(200).send({ status: true, msg: "author is update", data: updateData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.updateAuthor = updateAuthor;


const authorDelete = async function (req, res) {
    try {
        let authorId = req.params.id

        if (!isValid(authorId)) {
            return res.status(400).send({ status: false, message: "please provide authorID" })
        }
        if (!isValidObjectId(authorId)) {
            return res.status(400).send({ status: false, message: "please provide valid AuthorID" })
        }

        let authorDelete = await authorModel.findOne({ _id: authorId, isDeleted: false })

        if (!authorDelete) {
            return res.status(404).send({ status: false, message: 'book not found or already deleted' })
        }
        let authorDeleted = await authorModel.findOneAndUpdate({ _id: authorId }, { isDeleted: true }, { new: true })

        return res.status(200).send({ status: true, message: 'sucessfully deleted', data: authorDeleted })

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

module.exports.authorDelete = authorDelete;