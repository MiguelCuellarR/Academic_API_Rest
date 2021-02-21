const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    code: {
        type: "String",
        required: true,
        unique: true
    },
    name: {
        type: "String",
        required: true
    }
});

courseSchema.plugin(validator);
module.exports = courseSchema;