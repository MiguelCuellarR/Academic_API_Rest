const mongoose = require("mongoose");

const schema = require("../schemas/user.schema");

schema.statics = {
    create : function(data, cb){
        let doc = new this(data);
        doc.save(cb);
    },
    getAll : function(query, cb){
        this.find(query, cb);
    },
    getByCode : function(query, cb){
        this.find(query, cb);
    },
    update : function(query, data, cb){
        this.findOneAndUpdate(query, {$set: data}, {new: true}, cb);
    },
    delete : function(query, cb){
        this.findOneAndDelete(query)
    },
    login: function(query, cb){
        this.find(query, cb);
    },
};

const dto = mongoose.model("coll_user", schema);
module.exports = dto;