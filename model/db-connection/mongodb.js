//user: acad-rest-api-user
//pass: TIzsQQRpXU5B5T9w

const mongoose = require("mongoose");
const config = require("config");

const mongodbInfo = config.get("db-connections").mongodb;
//mongodb+srv://acad-rest-api-user:TIzsQQRpXU5B5T9w@cluster.tkoj9.mongodb.net/AcademicDB?retryWrites=true&w=majority
const connStr = `mongodb+srv://${mongodbInfo.user}:${mongodbInfo.password}@${mongodbInfo.host}/${mongodbInfo.dbname}?retryWrites=true&w=majority`

module.exports = () => {
    mongoose.connect(connStr);

    mongoose.connection.on("connected", () => {
        console.log("mongoDB Server Connected");
    });
    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB Server Disconnected");
    });
    mongoose.connection.on("error", () => {
        console.log("mongoDB Server error");
    });
    mongoose.connection.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log("mongoDB Server Shutting Down");
        })
    });
}