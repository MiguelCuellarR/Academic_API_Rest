const teacherDto = require("../../model/dto/teacher.dto");
const userDto = require("../../model/dto/user.dto");
const facultyDto = require("../../model/dto/faculty.dto")

const config = require("config")

const helper = require("../helpers/general.helper");
const notHelper = require("../helpers/notification.helper")

exports.createTeacher = (req, res, next) => {
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    facultyDto.getByCode({ code: req.body.department }, (err, facdata) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (facdata.length > 0) {
            teacherDto.create(teacher, (err, data) => {
                if (err) {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                let user = {
                    name: teacher.name,
                    lastname: teacher.lastname,
                    username: teacher.document,
                    password: helper.EncryptPassword(req.body.password),
                    role: config.get("roles").teacher
                }
                userDto.create(user, (err, u) => {
                    if (err) {
                        teacherDto.delete({ _id: data._id }, (err, data) => {
                            console.log("Deleting due to not user creation");
                            return res.status(400).json(
                                {
                                    error: err
                                }
                            );
                        });
                    }
                    notHelper.sendSMS(teacher.phone);
                    return res.status(201).json(
                        {
                            info: data,
                            infofac: facdata
                        }
                    )
                });
            });
        } else {
            teacherDto.delete({ _id: teacher._id}, (err,data) => {
                console.log("not faculty existed");
            });
            return res.status(400).json(
                {
                    error: "not faculty existed"
                }
            )
        }
    });
};

exports.updateTeacher = (req, res, next) => {
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    teacherDto.update({ _id: req.body.id }, teacher, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        facultyDto.getByCode({ code: req.body.department}, (err, facdata) => {
            if(err){
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            if (facdata.length > 0){
                if (req.body.olddocument != undefined) {
                    let user = {
                        name: teacher.name,
                        lastname: teacher.lastname,
                        username: teacher.document,
                        password: helper.EncryptPassword(req.body.password),
                        role: config.get("roles").teacher
                    }
                    userDto.update({ username: req.body.olddocument }, user, (err, u) => {
                        if (err) {
                            return res.status(400).json(
                                {
                                    error: err
                                }
                            );
                        }
                        notHelper.sendSMS(teacher.phone);
                        res.status(201).json(
                            {
                                info: u,
                                infofac: facdata
                            }
                        )
                    });
                }
                return res.status(201).json(
                    {
                        info: teacher,
                        infofac: facdata
                    }
                )
            }
            facultyDto.getAll({}, (err, faculdata) => {
                if(err){
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                return res.status(400).json(
                    {
                        info: data,
                        error: "The faculty does not exist, see if the code that is determined for your teacher",
                        program: faculdata
                    }
                )
            })
        });
        
    });
};

exports.getAll = (req, res, next) => {

    teacherDto.getAll({}, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.getByDocument = (req, res, next) => {

    teacherDto.getByDocument({ document: req.params.document }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.deleteTeacher = (req, res, next) => {

    teacherDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json(
            {
                info: data
            }
        )
    });
};