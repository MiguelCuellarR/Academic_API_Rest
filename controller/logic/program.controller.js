const programDto = require("../../model/dto/program.dto");
const facultyDto = require("../../model/dto/faculty.dto");

exports.createProgram = (req, res, next) => {
    let pgm = {
        code: req.body.code,
        name: req.body.name,
        directorname: req.body.directorname,
        facultyid: req.body.facultyid
    };
    facultyDto.getByID({ _id: req.body.facultyid }, (err, facdata) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (facdata.length > 0) {
            programDto.create(pgm, (err, data) => {
                if (err) {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                return res.status(201).json(
                    {
                        info: data,
                        infofac: facdata
                    }
                )
            });
        } else {
            programDto.delete({_id: pgm._id}, (err, data) => {
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
                    error: "not faculty existed"
                }
            );
        }
    });
};

exports.updateProgram = (req, res, next) => {
    let pgm = {
        code: req.body.code,
        name: req.body.name,
        directorname: req.body.directorname,
        facultyid: req.body.facultyid
    };
    programDto.update({ _id: req.body.id }, pgm, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        facultyDto.getByID({_id: req.body.facultyid},(err, facdata) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            if (facdata.length > 0){
                return res.status(201).json(
                    {
                        info: data,
                        infofaculty: facdata
                    }
                )
            }
            facultyDto.getAll({}, (err, facultydata) => {
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
                        error: "The faculty does not exist, see if the id that is determined for your program",
                        faculty: facultydata
                    }
                )
            });
        });
    });
};

exports.getAll = (req, res, next) => {

    programDto.getAll({}, (err, data) => {
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

exports.getByCode = (req, res, next) => {

    programDto.getByCode({ code: req.params.code }, (err, data) => {
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
    programDto.getByID({_id: req.params.id}, (err, data) => {
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

exports.deleteProgram = (req, res, next) => {

    programDto.delete({ _id: req.body.id }, (err, data) => {
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