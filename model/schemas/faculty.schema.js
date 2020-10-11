const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const facultySchema = new Schema({
    code: {
        type: "String",
        required: true,
        unique: true
    },
    name: {
        type: "String",
        required: true
    },
    deanname: {
        type: "String",
        required: true
    }
});
facultySchema.plugin(validator);
module.exports = facultySchema;