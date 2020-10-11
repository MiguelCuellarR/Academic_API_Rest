const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll-course",
        required: true
    },
    period_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll-period",
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll-teacher",
        required: true
    },
    number: {
        type: "Number",
        required: true
    }
});

module.exports = groupSchema;