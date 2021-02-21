const controller = require("../controller/logic/student_group.controller")
module.exports = (app) => {
    
    app.get("/student_group", (req, res, next) => {
        controller.getAll(req, res, next)
    });
    
    app.get("/student_group/byid/:id", (req, res, next) => {
        controller.getByID(req, res, next)
    });

    app.post("/student_group", (req, res, next) => {
        controller.createStudentGroup(req, res, next)
    });

    app.put("/student_group", (req, res, next) => {
        controller.updateStudentGroup(req, res, next)
    });

    app.delete("/student_group", (req, res, next) => {
        controller.deleteStudentGroup(req, res, next)
    });
};

