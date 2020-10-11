const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentgroupSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll-student",
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coll-group",
        required: true
    }
});

module.exports = studentgroupSchema;