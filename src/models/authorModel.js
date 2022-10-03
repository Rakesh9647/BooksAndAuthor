const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
},
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema)