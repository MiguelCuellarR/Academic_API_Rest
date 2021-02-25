//mongodb+srv://acad-rest-api-user:TIzsQQRpXU5B5T9w@cluster.tkoj9.mongodb.net/AcademicDB?retryWrites=true&w=majority
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");

const app = express();
const port = config.get("server-port");
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(jsonParser);
app.use(urlEncodedParser);

const ipFn = require("./middleware/getIpAddress")
app.use("*", ipFn)

app.get("/", (req, res, next) => {
    res.send("Welcome to academic rest api.")
});

const userRoutes = require("./routes/user.route");
userRoutes(app);

tkFn = require("./middleware/verifyToken");
app.use(tkFn);

const facultyRoutes = require("./routes/faculty.route");
facultyRoutes(app);

const programRoutes = require("./routes/program.route");
programRoutes(app);

const studentRoutes = require("./routes/student.route");
studentRoutes(app);

const teacherRoutes = require("./routes/teacher.route");
teacherRoutes(app);

const periodRoutes = require("./routes/period.route");
periodRoutes(app);

const courseRoutes = require("./routes/course.route");
courseRoutes(app);

const groupRoutes = require("./routes/group.route");
groupRoutes(app);

const student_groupRoutes = require("./routes/student_group.route");
student_groupRoutes(app);

app.listen(port, () => {
    console.log("Server is running...");
});
