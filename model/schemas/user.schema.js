const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    lastname: {
        type: "String",
        required: true
    },
    username: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    role: {
        type: "Number",
        required: true
    }
});

userSchema.plugin(validator);
module.exports = userSchema;