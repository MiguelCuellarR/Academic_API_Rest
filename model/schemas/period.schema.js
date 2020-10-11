const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const periodSchema = new Schema({
    year: {
        type: "Number",
        required: true,
        min: 2020,
        max: 2030
    },
    number: {
        type: "Number",
        required: true,
        min: 1,
        max: 2
    },
    current: {
        type: "Boolean",
        required: true,
        default: true
    }
});

module.exports = periodSchema;