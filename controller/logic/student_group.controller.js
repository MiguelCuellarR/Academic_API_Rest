const stdgroupDto = require("../../model/dto/student_group.dto");
const studentDto = require("../../model/dto/student.dto");
const groupDto = require("../../model/dto/group.dto");

exports.createStudentGroup = (req, res, next) => {
    let stdgroup = {
        student: req.body.studentid,
        group_id: req.body.groupid
    };
    studentDto.getByID({ _id: req.body.studentid }, (err, stddata) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        groupDto.getByID({ _id: req.body.groupid }, (e, groupdata) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: e
                    }
                );
            }
            if (stddata.length > 0 && groupdata.length > 0) {
                stdgroupDto.create(stdgroup, (error, data) => {
                    if (error) {
                        return res.status(400).json(
                            {
                                error: error
                            }
                        );
                    }
                    return res.status(201).json(
                        {
                            info: data,
                            infogroup: groupdata,
                            infostudent: stddata
                        }
                    )
                });
            } else {
                stdgroupDto.delete({ _id: stdgroup._id }, (err, data) => {
                    if (err) {
                        return res.status(400).json(
                            {
                                error: err
                            }
                        );
                    }
                });
                return res.status(400).json(
                    {
                        error: "not group or student existed"
                    }
                );
            }
        });
    });
};

exports.updateStudentGroup = (req, res, next) => {
    let stdgroup = {
        student: req.body.studentid,
        group_id: req.body.groupid
    };
    stdgroupDto.update({ _id: req.body.id }, stdgroup, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        groupDto.getByID({ _id: req.body.groupid }, (err, groupdata) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            studentDto.getByID({ _id: req.body.studentid }, (er, stddata) => {
                if (er) {
                    return res.status(400).json(
                        {
                            error: er
                        }
                    );
                }
                if (groupdata.length > 0 && stddata.length > 0) {
                    return res.status(201).json(
                        {
                            info: data,
                            infogroup: groupdata,
                            infostudent: stddata
                        }
                    )
                }
                groupDto.getAll({}, (err, grdata) => {
                    if (err) {
                        return res.status(400).json(
                            {
                                error: err
                            }
                        );
                    }
                    studentDto.getAll({}, (err, stdata) => {
                        if (err) {
                            return res.status(400).json(
                                {
                                    error: err
                                }
                            )
                        }
                        return res.status(400).json(
                            {
                                info: data,
                                error: "The group or student does not exist, see if the id that is determined for your student_group",
                                group: grdata,
                                student: stdata
                            }
                        )
                    })
                });
            });
        });
    })
}

    exports.getAll = (req, res, next) => {
        stdgroupDtoDto.getAll({}, (err, data) => {
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

    exports.deleteStudentGroup = (req, res, next) => {
        stdgroupDtoDto.delete({ _id: req.body.id }, (err, data) => {
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