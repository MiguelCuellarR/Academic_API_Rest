const mongoose = require("mongoose");
const db = require("../db-connection/mongodb");

const schema = require("../schemas/group.schema");
db();

schema.statics = {
    create : function(data, cb){
        let doc = new this(data);
        doc.save(cb);
    },
    getAll : function(query, cb){
        this.find(query, cb);
    },
    getByID : function(query, cb){
        this.find(query, cb);
    },
    update : function(query, data, cb){
        this.findOneAndUpdate(query, {$set: data}, {new: true}, cb);
    },
    delete : function(query, cb){
        this.findOneAndDelete(query)
    }
};
const dto = mongoose.model("coll_group", schema);
module.exports = dto;