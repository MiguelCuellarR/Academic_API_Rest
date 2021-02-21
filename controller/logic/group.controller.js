const groupDto = require("../../model/dto/group.dto");
const courseDto = require("../../model/dto/course.dto");
const teacherDto = require("../../model/dto/teacher.dto");
const periodDto = require("../../model/dto/period.dto");

exports.createGroup = (req, res, next) => {
    let group = {
        course_id: req.body.courseid,
        period_id: req.body.periodid,
        teacher_id: req.body.teacherid,
        number: req.body.number
    };
    courseDto.getByID({ _id: req.body.courseid }, (err, coursedata) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        teacherDto.getByID({ _id: req.body.teacherid }, (er, teacherdata) => {
            if (er) {
                return res.status(400).json(
                    {
                        error: er
                    }
                );
            }
            periodDto.getByID({ _id: req.body.periodid }, (e, perioddata) => {
                if (er) {
                    return res.status(400).json(
                        {
                            error: er
                        }
                    );
                }
                if (coursedata.length > 0 && teacherdata.length > 0 && perioddata.length > 0){
                    groupDto.create(group, (error, data) => {
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
                                infocourse: coursedata,
                                infoperiod: perioddata,
                                infoteacher: teacherdata
                            }
                        )
                    });
                } else {
                    groupDto.delete({_id: group._id}, (error, data) => {
                        if (err) {
                            return res.status(400).json(
                                {
                                    error: error
                                }
                            );
                        }
                    });
                    return res.status(400).json(
                        {
                            error: "not course, period or teacher existed"
                        }
                    );
                }
            });
        });
    });
};

exports.updateGroup = (req, res, next) => {
    let group = {
        course_id: req.body.courseid,
        period_id: req.body.periodid,
        teacher_id: req.body.teacherid,
        number: req.body.number
    };
    groupDto.update({ _id: req.body.id }, group, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        courseDto.getByID({_id: req.body.courseid},(err, coursedata) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            periodDto.getByID({_id: req.body.periodid}, (e, perioddata) => {
                if (e) {
                    return res.status(400).json(
                        {
                            error: e
                        }
                    );
                }
                teacherDto.getByID({_id: req.body.teacherid}, (error, teacherdata) => {
                    if (error) {
                        return res.status(400).json(
                            {
                                error: error
                            }
                        );
                    }
                    if (coursedata.length > 0 && perioddata.length > 0 && teacherdata.length > 0){
                        return res.status(201).json(
                            {
                                info: data,
                                infocourse: coursedata,
                                infoperiod: perioddata,
                                infoteacher: teacherdata
                            }
                        )
                    }
                    courseDto.getAll({}, (err, coudata) => {
                        if(err){
                            return res.status(400).json(
                                {
                                    error: err
                                }
                            );
                        }
                        periodDto.getAll({}, (err, perdata) => {
                            if(err){
                                return res.status(400).json(
                                    {
                                        error: err
                                    }
                                );
                            }
                            teacherDto.getAll({}, (err, teadata) => {
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
                                        error: "The course, period or teacher does not exist, see if the id that is determined for your group",
                                        course: coudata,
                                        period: perdata,
                                        teacher: teadata
                                    }
                                )
                            })
                        })
                    })
                });
            });
        });
    });
};

exports.getAll = (req, res, next) => {

    groupDto.getAll({}, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        return res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.getByID = (req, res, next) => {
    groupDto.getByID({_id: req.params.id}, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        return res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.deleteGroup = (req, res, next) => {

    groupDto.delete({ _id: req.body.id }, (err, data) => {
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