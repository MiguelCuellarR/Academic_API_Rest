const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    code: {
        type: "String",
        required: true,
        unique: true
    },
    name: {
        type: "String",
        required: true
    },
    lastname: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    phone: {
        type: "String",
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll_program",
        required: true
    }
});
studentSchema.plugin(validator);
module.exports = studentSchema;