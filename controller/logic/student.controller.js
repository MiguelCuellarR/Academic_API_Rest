const studentDto = require("../../model/dto/student.dto");
const userDto = require("../../model/dto/user.dto");
const programDto = require("../../model/dto/program.dto")
const config = require("config")

const helper = require("../helpers/general.helper");
const notHelper = require("../helpers/notification.helper")

exports.createStudent = (req, res, next) => {
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        program: req.body.program
    };
    programDto.getByID({ _id: req.body.program }, (err, progdata) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (progdata.length > 0) {
            studentDto.create(std, (err, data) => {
                if (err) {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                let user = {
                    name: std.name,
                    lastname: std.lastname,
                    username: std.code,
                    password: helper.EncryptPassword(req.body.password),
                    role: config.get("roles").student
                }
                userDto.create(user, (err, data) => {
                    if (err) {
                        studentDto.delete({ _id: data._id }, (err, data) => {
                            console.log("Deleting due to not user creation");
                            return res.status(400).json(
                                {
                                    error: err
                                }
                            );
                        });
                    }
                    notHelper.sendSMS(std.phone);
                    return res.status(201).json(
                        {
                            info: data,
                            infoprog: progdata
                        }
                    )
                });
            });
        } else {
            studentDto.delete({ _id: std._id }, (err, data) => {
                console.log("not program existed");
            });
            return res.status(400).json(
                {
                    error: "not program existed"
                }
            );
        }
    });
};

exports.updateStudent = (req, res, next) => {
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        program: req.body.program
    };
    studentDto.update({_id: req.body.id}, std, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        programDto.getByID({_id: req.body.program}, (err, progdata) => {
            if(err){
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            if (progdata.length > 0){
                return res.status(201).json(
                    {
                        info: data,
                        infoprog: progdata
                    }
                )
            }
            programDto.getAll({}, (err, programdata) => {
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
                        error: "The program does not exist, see if the id that is determined for your program",
                        program: programdata
                    }
                )
            });
            
        });
        
    });
};

exports.getAll = (req, res, next) => {
    studentDto.getAll({}, (err, data) => {
        if(err){
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

exports.getByCode = (req, res, next) => {
    
    studentDto.getByCode({code: req.params.code}, (err, data) => {
        if(err){
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

exports.deleteStudent = (req, res, next) => {
    
    studentDto.delete({_id: req.body.id}, (err, data) => {
        if(err){
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