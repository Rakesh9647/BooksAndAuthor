const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
  authorId: {
    type: ObjectId, ref: 'Author',
    required: true, 
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema)