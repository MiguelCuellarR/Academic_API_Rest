const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    code: {
        type: "String",
        required: true
    },
    name: {
        type: "String",
        required: true
    }
});

module.exports = courseSchema;