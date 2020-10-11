const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const programSchema = new Schema({
    code: {
        type: "String",
        required: true,
        unique: true
    },
    name: {
        type: "String",
        required: true
    },
    directorname: {
        type: "String",
        required: true
    },
    facultyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll_faculty",
        required: true
    }
});
programSchema.plugin(validator);
module.exports = programSchema;